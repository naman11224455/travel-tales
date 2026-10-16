(() => {
  const photos = [
    "photo-1524492412937-b28074a5d7da",
    "photo-1561361513-2d000a50f0dc",
    "photo-1606293926075-69a00dbfde81",
    "photo-1564507592333-c60657eea523",
    "photo-1548013146-72479768bada",
    "photo-1599661046827-dacff0c0f09a",
    "photo-1500530855697-b586d89ba3ee",
    "photo-1604608672516-90c9f7a41f5d",
    "photo-1566127992631-137a642a90f4",
    "photo-1512343879784-a960bf40e7f2",
    "photo-1602216056096-3b40cc0efaf8",
    "photo-1477587458883-47145ed94245"
  ];

  const regions = [
    ["Andhra Pradesh", 2100, [
      ["Tirumala Venkateswara Temple", "Tirupati", "Temple", "A celebrated hilltop pilgrimage site."],
      ["Araku Valley", "Alluri Sitharama Raju", "Nature", "Coffee country, waterfalls, and Eastern Ghats views."]
    ]],
    ["Arunachal Pradesh", 3000, [
      ["Tawang Monastery", "Tawang", "Culture", "A spectacular monastery in the high Himalayas."],
      ["Ziro Valley", "Ziro", "Nature", "Pine hills, Apatani villages, and open valley walks."]
    ]],
    ["Assam", 2300, [
      ["Kaziranga National Park", "Kohora", "Wildlife", "Grasslands and wildlife in a UNESCO-listed park."],
      ["Majuli Island", "Jorhat", "Culture", "River-island satras, crafts, and quiet village life."]
    ]],
    ["Bihar", 1800, [
      ["Mahabodhi Temple", "Bodh Gaya", "Heritage", "A landmark Buddhist pilgrimage complex."],
      ["Ancient Nalanda", "Nalanda", "Heritage", "Explore the remains of a renowned ancient university."]
    ]],
    ["Chhattisgarh", 2000, [
      ["Chitrakote Falls", "Jagdalpur", "Nature", "A dramatic horseshoe waterfall on the Indravati River."],
      ["Bhoramdeo Temple", "Kawardha", "Heritage", "Intricate temple carvings in a forested setting."]
    ]],
    ["Goa", 3000, [
      ["Basilica of Bom Jesus", "Old Goa", "Heritage", "A landmark church in Goa’s historic quarter."],
      ["Palolem Beach", "Canacona", "Beach", "A palm-lined bay for swimming and slow evenings."]
    ]],
    ["Gujarat", 2500, [
      ["Statue of Unity", "Ekta Nagar", "Landmark", "A monumental statue beside the Narmada River."],
      ["Great Rann of Kutch", "Dhordo", "Nature", "Wide salt flats, especially striking at sunset."]
    ]],
    ["Haryana", 2000, [
      ["Brahma Sarovar", "Kurukshetra", "Heritage", "A storied pilgrimage tank and peaceful walking circuit."],
      ["Sultanpur National Park", "Gurugram", "Wildlife", "A wetland bird sanctuary close to Delhi."]
    ]],
    ["Himachal Pradesh", 2700, [
      ["The Ridge", "Shimla", "Hill station", "Colonial-era walks and mountain-town views."],
      ["Key Monastery", "Spiti Valley", "Culture", "A centuries-old monastery set high above the Spiti River."]
    ]],
    ["Jharkhand", 2000, [
      ["Baidyanath Dham", "Deoghar", "Temple", "An important Jyotirlinga temple complex."],
      ["Hundru Falls", "Ranchi", "Nature", "A scenic waterfall reached through a forested landscape."]
    ]],
    ["Karnataka", 2600, [
      ["Hampi", "Hosapete", "Heritage", "Vast Vijayanagara ruins among striking boulder hills."],
      ["Mysuru Palace", "Mysuru", "Heritage", "An ornate royal palace glowing beautifully after dusk."]
    ]],
    ["Kerala", 2800, [
      ["Alappuzha Backwaters", "Alappuzha", "Backwaters", "Cruise palm-fringed canals and village waterways."],
      ["Tea Gardens", "Munnar", "Hill station", "Walk through cool highland tea country."]
    ]],
    ["Madhya Pradesh", 2300, [
      ["Khajuraho Group of Monuments", "Khajuraho", "Heritage", "UNESCO-listed temples with remarkable stone sculpture."],
      ["Sanchi Stupa", "Sanchi", "Heritage", "Ancient Buddhist stupas, gateways, and quiet paths."]
    ]],
    ["Maharashtra", 2700, [
      ["Gateway of India", "Mumbai", "Landmark", "A waterfront city landmark facing the Arabian Sea."],
      ["Ajanta Caves", "Aurangabad", "Heritage", "Rock-cut Buddhist caves with celebrated murals."]
    ]],
    ["Manipur", 2200, [
      ["Loktak Lake", "Bishnupur", "Nature", "Explore a vast lake dotted with floating phumdis."],
      ["Kangla Fort", "Imphal", "Heritage", "A historic seat of the former Manipur kingdom."]
    ]],
    ["Meghalaya", 2600, [
      ["Living Root Bridges", "Cherrapunji", "Nature", "Walk to remarkable bridges grown from living roots."],
      ["Umiam Lake", "Shillong", "Nature", "A scenic reservoir surrounded by pine-covered hills."]
    ]],
    ["Mizoram", 2400, [
      ["Reiek", "Aizawl", "Nature", "A hilltop trail with panoramic views and a heritage village."],
      ["Vantawng Falls", "Serchhip", "Nature", "Mizoram’s highest waterfall in a green valley."]
    ]],
    ["Nagaland", 2700, [
      ["Kohima War Cemetery", "Kohima", "Heritage", "A quiet memorial garden with sweeping hillside views."],
      ["Dzukou Valley", "Kohima", "Trekking", "A high-altitude valley known for seasonal flowers."]
    ]],
    ["Odisha", 2200, [
      ["Jagannath Temple", "Puri", "Temple", "A major pilgrimage landmark in the heart of Puri."],
      ["Konark Sun Temple", "Konark", "Heritage", "A remarkable stone temple shaped like a sun chariot."]
    ]],
    ["Punjab", 2200, [
      ["Golden Temple", "Amritsar", "Temple", "A serene, welcoming sanctuary beside the sacred pool."],
      ["Jallianwala Bagh", "Amritsar", "Heritage", "A memorial garden preserving an important chapter of history."]
    ]],
    ["Rajasthan", 2600, [
      ["Amber Fort", "Jaipur", "Fort", "A hilltop fort with courtyards, halls, and lake views."],
      ["Jaisalmer Fort", "Jaisalmer", "Heritage", "A living golden sandstone fort rising from the desert."]
    ]],
    ["Sikkim", 2900, [
      ["Rumtek Monastery", "Gangtok", "Culture", "A major monastery with mountain views and rich traditions."],
      ["Tsomgo Lake", "East Sikkim", "Nature", "A high-altitude glacial lake reached by a mountain road."]
    ]],
    ["Tamil Nadu", 2400, [
      ["Meenakshi Amman Temple", "Madurai", "Temple", "A vibrant temple complex famed for its towering gopurams."],
      ["Ooty Botanical Gardens", "Ooty", "Hill station", "A leafy garden escape in the Nilgiri Hills."]
    ]],
    ["Telangana", 2200, [
      ["Charminar", "Hyderabad", "Heritage", "The iconic old-city monument surrounded by lively bazaars."],
      ["Ramappa Temple", "Palampet", "Heritage", "A UNESCO-listed Kakatiya temple in a tranquil setting."]
    ]],
    ["Tripura", 2000, [
      ["Ujjayanta Palace", "Agartala", "Museum", "A domed former royal palace and museum."],
      ["Neermahal", "Melaghar", "Heritage", "A lakeside palace reached by boat across Rudrasagar."]
    ]],
    ["Uttar Pradesh", 2300, [
      ["Kashi Vishwanath Temple", "Varanasi", "Temple", "A revered riverside-city temple in the old lanes."],
      ["Ram Janmabhoomi", "Ayodhya", "Temple", "A major pilgrimage destination on the Sarayu River."]
    ]],
    ["Uttarakhand", 2600, [
      ["Triveni Ghat", "Rishikesh", "Riverside", "An evening Ganga aarti beside the Himalayan foothills."],
      ["Naini Lake", "Nainital", "Nature", "Take a boat across a mountain lake ringed by hills."]
    ]],
    ["West Bengal", 2300, [
      ["Victoria Memorial", "Kolkata", "Museum", "A marble landmark set in broad, leafy gardens."],
      ["Tiger Hill", "Darjeeling", "Nature", "Catch sunrise over the Himalayan peaks on a clear morning."]
    ]],
    ["Andaman and Nicobar Islands", 4000, [
      ["Radhanagar Beach", "Swaraj Dweep", "Beach", "Soft white sand, turquoise water, and a famous sunset."],
      ["Cellular Jail", "Sri Vijaya Puram", "Heritage", "A moving national memorial on the Andaman coast."]
    ]],
    ["Chandigarh", 2200, [
      ["Rock Garden", "Chandigarh", "Garden", "A remarkable sculpture garden built from reclaimed materials."],
      ["Sukhna Lake", "Chandigarh", "Nature", "A relaxed promenade for boating and evening walks."]
    ]],
    ["Dadra and Nagar Haveli and Daman and Diu", 2400, [
      ["Diu Fort", "Diu", "Heritage", "A sea-facing fort with wide views over the Arabian Sea."],
      ["Dudhni Lake", "Silvassa", "Nature", "A peaceful lake surrounded by forested hills."]
    ]],
    ["Delhi", 2500, [
      ["Qutub Minar", "New Delhi", "Heritage", "A soaring UNESCO-listed minaret in a historic complex."],
      ["Humayun’s Tomb", "New Delhi", "Heritage", "A garden tomb that inspired generations of Mughal design."]
    ]],
    ["Jammu and Kashmir", 3500, [
      ["Dal Lake", "Srinagar", "Lake", "Glide past houseboats and mountain reflections in a shikara."],
      ["Gulmarg Gondola", "Gulmarg", "Mountain", "Ride high above meadows and snow-covered peaks."]
    ]],
    ["Ladakh", 3800, [
      ["Pangong Tso", "Leh", "Lake", "A high-altitude lake known for vivid changing colours."],
      ["Thiksey Monastery", "Leh", "Culture", "Explore a hilltop monastery with broad Indus Valley views."]
    ]],
    ["Lakshadweep", 5000, [
      ["Agatti Island", "Agatti", "Island", "Discover a lagoon of clear water and coral reefs."],
      ["Bangaram Island", "Bangaram", "Island", "A quiet island escape with white sand and blue lagoons."]
    ]],
    ["Puducherry", 2400, [
      ["Promenade Beach", "Puducherry", "Beach", "Walk the breezy seafront beside the French Quarter."],
      ["Auroville", "Auroville", "Culture", "Visit an international township set among green landscapes."]
    ]]
  ];

  const photoOverrides = {
    "Tirumala Venkateswara Temple": "https://img.wikiwand.com/wikipedia/commons/thumb/4/4e/Tirumala_Anand_nilayam4653.jpg/1280px-Tirumala_Anand_nilayam4653.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "Araku Valley": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq2j4ha2nLZ0-yjXBBfw7cz5RYmn_gexfY5yJBEZ3U1A&s=10",
    "Tawang Monastery": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2gIPeFe6ARldUTcTaaW-9usPAMFkDJZ1db46PkIYgcg&s=10",
    "Ziro Valley": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIDeNFvhpj30VjylhKK9eHklOLnu9gtKW7wMzRPaRt4A&s=10",
    "Hampi": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQivBgbKywfBJSNHZpQZMh6J_dEoMqX0yUaM9Hxt5EWuA&s=10",
    "Hundru Falls": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt_0yf6wlsDEtd2uFFvXOzz9fT2yk0AVY14WJilnXXIw&s=10",
    "Baidyanath Dham": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0NGKRLyKOKegFwPvDNTESmKHop225-bNMQAXdlz8nsw&s=10",
    "Key Monastery": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEWJZa4QFOOc2H00bzNcmX8C49PGInF3H6eM649TVeBg&s=10",
    "The Ridge": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0g3pmkBsdxzYE1sqiuDtajMliatC2CGyhkKW1D8WuoQ&s=10",
    "Sultanpur National Park": "https://cdn.getyourguide.com/image/format=auto%2Cfit=crop%2Cgravity=auto%2Cquality=60%2Cwidth=375%2Cheight=375%2Cdpr=2/tour_img/01acc01a96ddccd093591de8a26b47bbfe1127b91c147ba212e3d939446f7652.jpg",
    "Palolem Beach": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo_gJqAKroGpkODGw49sy-g1BO764LPx1Dhj0j9fc3zw&s=10",
    "Basilica of Bom Jesus": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRrk5b_BoqGWSWHRRCKj2eL5y_UheL_N4hTXvQGqPUIg&s=10",
    "Bhoramdeo Temple": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR9Iq52ZGFxkTKp71kjRENgSL_nPUOE0r045q1K6Hr-Q&s=10",
    "Chitrakote Falls": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeC4SOM4ckZTepDe4LCg_OWSTtBdmFub4s8X5OgawiXg&s=10",
    "Ancient Nalanda": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTApfz90oAvNYc3A0pNekSoBtoUBF-sZCPzTs0sgsEeiA&s=10",
    "Mahabodhi Temple": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6OnzeuRvhNKtcLKgYyMgTKM7agaCnhhrEhoIgtSOQWQ&s=10",
    "Majuli Island": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShfDKQcDidMsGm_ZizONKw_Wb4evjVqjfkzafRyemlEw&s=10",
    "Kaziranga National Park": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg-rsJpaVPVJBPcEpsdfgwUUtievetiKa-3aoMa1hvhA&s=10",
    "Statue of Unity": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTM-Z_8wXGH9q9wGcfYQpbh-CYJWKQd2WSL1WhDwck6A&s=10",
    "Auroville": "https://static.toiimg.com/thumb/99391984/Matrimandir-in-Puducherry.jpg?height=358&resize=4&width=636",
    "Promenade Beach": "https://www.karthitravels.com/images/destinations/puducherry/promenade-beach/promenade-beach-1-480.webp",
    "Bangaram Island": "https://api.theindia.co.in/storage/image/places/banner/bangaram-965839.jpg",
    "Agatti Island": "https://api.theindia.co.in/storage/image/places/banner/agatti-island-174694.jpg",
    "Thiksey Monastery": "https://cdn.travelcoffee.in/uploads/c9652e59-d6f4-4d3e-acda-788cead03116-Whitewashed_Thiksey_Monastery_under_blue_sky.jpg",
    "Pangong Tso": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/00/2f/67/img-20180620-wa0007-largejpg.jpg?w=1200&h=-1&s=1",
    "Gulmarg Gondola": "https://www.jammukashmircablecar.com/pub/images/hero-banner-gulmarg-winter.webp",
    "Dal Lake": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e1/Dal_Lake_Hazratbal_Srinagar.jpg/1280px-Dal_Lake_Hazratbal_Srinagar.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=thumbnail",
    "Humayun’s Tomb": "https://s7ap1.scene7.com/is/image/incredibleindia/humayuns-tomb-delhi-1-attr-hero?qlt=82&ts=1742197608302",
    "Qutub Minar": "https://delhitourism.travel/images/places-to-visit/headers/qutub-minar-delhi-header.jpg",
    "Diu Fort": "https://www.trawell.in/admin/images/upload/899766631Diu_Fort1.jpg",
    "Sukhna Lake": "https://d34vm3j4h7f97z.cloudfront.net/optimized/4X/a/b/e/abef7c523b1454bf02d2c9b7b8f976c918342d90_2_690x460.jpeg",
    "Rock Garden": "https://miro.medium.com/1*6cwYQsFdn3HaKUgZZbVpZw.jpeg",
    "Cellular Jail": "https://www.trawell.in/admin/images/upload/171363660Andaman_Cellular_Jail_Main.jpg",
    "Radhanagar Beach": "https://www.havelockislandbeachresort.com/storage/radhanagar-beach.jpg",
    "Victoria Memorial": "https://upload.wikimedia.org/wikipedia/commons/7/72/Victoria_Memorial_situated_in_Kolkata.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original",
    "Naini Lake": "https://nainitaltourism.org.in/images/v2/places-to-visit/naini-lake-nainital-tourism-header.jpg",
    "Triveni Ghat": "https://www.trawell.in/admin/images/upload/148894262Rishikesh_Triveni_Ghat_Main.jpg",
    "Ram Janmabhoomi": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRADqE8rQbUzj7cmKJ_kAxGm3pU-F4ua-xl1NXtsGFO9g&s=10",
    "Kashi Vishwanath Temple": "https://www.lordshiva.co.in/assets/images/shri-kashi-vishwanath-temple-varanasi.webp",
    "Neermahal": "https://s7ap1.scene7.com/is/image/incredibleindia/neermahal-agartala-tripura-3-attr-hero?qlt=82&ts=1726651053473",
    "Ujjayanta Palace": "https://s7ap1.scene7.com/is/image/incredibleindia/ujjayanta-palace-agartala-tripura-1-attr-hero?qlt=82&ts=1726651012562",
    "Ramappa Temple": "https://i0.wp.com/weekendyaari.in/wp-content/uploads/2024/09/ramappa-temple-warangal.webp?fit=1000%2C600&ssl=1",
    "Charminar": "https://s7ap1.scene7.com/is/image/incredibleindia/charminar-hyderabad-secunderabad-telangana-musthead-hero?qlt=82&ts=1742167556337",
    "Ooty Botanical Gardens": "https://d2rdhxfof4qmbb.cloudfront.net/wp-content/uploads/2024/05/pexels-kirandeepsingh-27090137.jpg",
    "Meenakshi Amman Temple": "https://temple.yatradham.org/public/Product/temple/temple_M7njbUkm_202408131250560.jpg",
    "Brahma Sarovar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuFpZaZIT0YivzcWEyKieL6iBmmGrbNySvTGn0tBNtsA&s=10",
    "Great Rann of Kutch": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ-C5yLsUTMZ5KexsV8oPA9FGWt_6LKd9ovvsvdTa3DA&s=10",
    "Tsomgo Lake": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTojJ09cbfGUzus-tg5ncaSOcLCH-L7XiGnKdfBFLkLMw&s=10",
    "Rumtek Monastery": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCraviE_Fl3f01bs9gB5JAVpJYUORRcquUY1d79YSLeQ&s=10",
    "Jaisalmer Fort": "https://www.indianholiday.com/wordpress/wp-content/uploads/2026/05/Forts-in-Jaisalmer.jpg",
    "Amber Fort": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcMFv7VCUfm5yzDcwNAGUJV5WHjX9FLqCsYyhFlLp8Rg&s=10",
    "Jallianwala Bagh": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-sfQaox2PaYFqiFlR40xX9EGT75Prfm73mdOvpQj0Jw&s=10",
    "Golden Temple": "https://www.kidsandpassports.com/wp-content/uploads/visit-golden-temple-night-1024x725.jpeg",
    "Konark Sun Temple": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/34/Sun_Temple_Konark_Puri_District_Odisha.jpg/1280px-Sun_Temple_Konark_Puri_District_Odisha.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail",
    "Jagannath Temple": "https://www.triptotemples.com/_next/image?url=https%3A%2F%2Fcdn.triptotemples.com%2Fblogs%2F1-3-6a50de3465d72bcba0736a54-70508801.webp%3Fwidth%3D900%26height%3D600%26mode%3Dcrop%26crop%3Dsmart&w=1920&q=75",
    "Dzukou Valley": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1OBnfe66MQ6XYPiak7Ph9V-7TBte679qVitS-N-CeUw&s=10",
    "Kohima War Cemetery": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkrnDV0V1yKp8Nrz54RKupoV4g9B4xCDzWZNaoopkRbQ&s=10",
    "Vantawng Falls": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8JUHfZM7E0cspfwFitw_HqubmbiU_pwiQVCfa1pwnxA&s=10",
    "Reiek": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHzAbi8_lWzkoBeZ6q60aQ02QaV45oFpqAUIb-waSMuQ&s=10",
    "Umiam Lake": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdiSaNOmGJOAJdSreD4Jd3CR5gq2KJ_Hm01wVBQ--omQ&s=10",
    "Living Root Bridges": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxdHZv6lAXNCbz_E5mGvg8qYoqyAq9rL_1gVhJX-mYVg&s=10",
    "Kangla Fort": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ20BMmWVqlOuqYyQMUhYrPO6NtSCtALPnpGlV9Os387A&s=10",
    "Loktak Lake": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfjBENpwxn4uZWVoQWdxw-6I4aeeVdMxs1UyVBujxw4A&s=10",
    "Ajanta Caves": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbMbaU2CWMLLnLmH8ucDhUZ2fDr1K43i-yYpEuuZKiyQ&s=10",
    "Gateway of India": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmdUUy5YwEL4AATZJbqcGZL5LhPDIWVoJECKHjkWCfdw&s=10",
    "Sanchi Stupa": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1YgFrXDx1yq1S7t7lpfKKXvUoaGbiMO1kniozIvuV_Q&s=10",
    "Khajuraho Group of Monuments": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh6Ja9JrW650NJny22Fk9XK4zpESaFCK26cqH_EUBfLQ&s=10",
    "Tea Gardens": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKXsmzSlh_KZOncWY28PVbaoK5LnNipLeGaZlMZnH3BA&s=10",
    "Alappuzha Backwaters": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsWOxST1WUJSIIEYV39k6098MeC9q1Q-sbVzlUQufKxw&s=10",
    "Mysuru Palace": "https://images.lifestyleasia.com/wp-content/uploads/sites/7/2023/07/25152833/Mysore-Palace-FI.jpg?tr=w-1200,h-900",
    "Dudhni Lake": "https://s7ap1.scene7.com/is/image/incredibleindia/dudhni-lake-silvassa-daman-%26-diu-attr-about?qlt=82&ts=1742163563231",
    "Tiger Hill": "https://darjeelingyatra.com/images/local-sightseeing/tiger-hill-500-400.webp"
  };

  const destinations = {};
  regions.forEach(([state, dailyBudget, attractions]) => {
    attractions.forEach(([name, city, category, description], index) => {
      const id = `${state}-${name}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const photo = photos[(regions.findIndex((region) => region[0] === state) * 2 + index) % photos.length];
      const image = photoOverrides[name] || `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=900&q=85`;
      destinations[id] = {
        name,
        city,
        state,
        category,
        description,
        duration: "1–3 hours",
        time: index === 0 ? "9:00 AM" : "1:00 PM",
        order: index === 0 ? 540 : 780,
        dailyBudget,
        hotelPricePerNight: Math.round(dailyBudget * 0.4 / 100) * 100,
        image,
        thumb: image,
        mapQuery: `${name} ${city}`
      };
    });
  });

  window.travelDestinations = destinations;
})();
