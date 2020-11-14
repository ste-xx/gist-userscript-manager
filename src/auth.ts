const client_id = "39a009625c0b1f336d94";
const client_secret = "2e363c1a9fced7a931af9244d5abf07dfd9192ac";

export const launchWebAuthFlow = (): Promise<string | undefined> => new Promise((resolve) => {
  const redirect_uri = `https://${chrome.runtime.id}.chromiumapp.org/provider_cb`;
  chrome.identity.launchWebAuthFlow(
    {
      url: `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=gist`,
      interactive: true
    },
    (redirect_url) => resolve(redirect_url)
  );
});

export const auth = async (): Promise<{access_token: string}>=> {
  const redirectUrl = await launchWebAuthFlow();
  if (!redirectUrl) {
    throw new Error("login failed");
  }
  const code = new URL(redirectUrl).searchParams.get("code");
  if(!code){
    throw new Error("login failed");
  }
  const { access_token } = await fetch(`https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}`, {
    headers: {
      Accept: "application/json"
    },
    method: "GET"
  }).then((r) => r.json() as Promise<{access_token: string}>).catch(e => {
    console.warn(e);
    return Promise.reject('wtf');
  });

  return {
    access_token: access_token
  };
};

void auth();
