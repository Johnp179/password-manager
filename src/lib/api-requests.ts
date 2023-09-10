export async function getRequest(url: string) {
  const resp = await fetch(url);
  if (!resp.ok) {
    throw new Error(`Server responded with ${resp.status} code`);
  }
  return resp.json();
}

export async function deleteRequest(url: string) {
  const resp = await fetch(url, { method: "DELETE" });
  if (!resp.ok) {
    throw new Error(`Server responded with ${resp.status} code`);
  }
  return resp.json();
}

export async function updateRequest(url: string, data: Record<string, string>) {
  const resp = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!resp.ok) {
    throw new Error(`Server responded with ${resp.status} code`);
  }
  return resp.json();
}

export async function postRequest(url: string, data: Record<string, string>) {
  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const { status } = resp;
  if (status === 404 || status === 405) {
    throw new Error(`Server responded with ${resp.status} code`);
  }
  const result = await resp.json();
  if (status === 500) {
    throw new Error(result);
  }
  if (status === 400) {
    throw result;
  }
  return {
    status,
    result,
  };
}
