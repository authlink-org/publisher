const API_KEY = "b7b85e6654ae86350e8d1f90c75bf7fff30a82188b3070ed23a16934921b0a72"
const URL = "https://be.lootlabs.gg/api/lootlabs/content_locker"

fetch(URL, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${API_KEY}`
  },
  body: JSON.stringify({
    title: "API TEST",
    url: "https://authlink.org/?p=1",
    tier_id: 3,
    number_of_tasks: 3
  })
}).then((R) => R.json().then((x) => console.log(x)))