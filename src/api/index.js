
async function fetchJson(url) {
  try {
    const res = await fetch(url);
    return await res.json();
  } catch(e) {
    console.log(e);
    return { data: [] };
  }
}

export async function fetchHousingOptions() {
  return fetchJson("https://api.jsonbin.io/b/5cdb03f94fc34d41690069c5");
}
