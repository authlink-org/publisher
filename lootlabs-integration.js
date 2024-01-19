// b7b85e6654ae86350e8d1f90c75bf7fff30a82188b3070ed23a16934921b0a72
// 20fb0a02c6cbeebf7bdbb1e864aafc415f2e8418fb54183074079161598ece88
const API_KEY = "b7b85e6654ae86350e8d1f90c75bf7fff30a82188b3070ed23a16934921b0a72"
const URL = "https://be.lootlabs.gg/api/lootlabs/content_locker"

console.log("Using API Key", API_KEY)

fetch(URL, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${API_KEY}`
  },
  body: JSON.stringify({
    title: "API Integration",
    url: "https://authlink.org/?test=135",
    tier_id: 3,
    number_of_tasks: 3,
    theme: 4
  })
}).then((R) => R.text().then((x) => console.log(x)))