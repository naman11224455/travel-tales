(() => {
  "use strict";

  const STORAGE_KEY = "traveltales-itinerary";
  const HOTEL_SELECTIONS_KEY = "traveltales-hotel-selections";
  const HOTEL_OPTIONS = [
    { id: "budget", name: "Budget stay", multiplier: 0.7, image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=500&q=80", alt: "Illustrative simple hotel room" },
    { id: "comfort", name: "Comfort hotel", multiplier: 1, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=80", alt: "Illustrative comfortable hotel and pool" },
    { id: "premium", name: "Premium retreat", multiplier: 2, image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=500&q=80", alt: "Illustrative premium resort" }
  ];
  const places = {
    janmabhoomi: {
      name: "Shri Krishna Janmabhoomi",
      city: "Mathura",
      state: "Uttar Pradesh",
      category: "Temple visit",
      duration: "1–2 hours",
      time: "9:00 AM",
      order: 540,
      dailyBudget: 2300,
      hotelPricePerNight: 900,
      image: "https://wiralfeed.wordpress.com/wp-content/uploads/2015/12/krishna-janmabhumi.jpg?crop=1&h=435&w=1024",
      thumb: "https://wiralfeed.wordpress.com/wp-content/uploads/2015/12/krishna-janmabhumi.jpg?crop=1&h=435&w=1024",
      mapQuery: "Shri Krishna Janmabhoomi Mathura"
    },
    dwarkadhish: {
      name: "Dwarkadhish Temple",
      city: "Mathura",
      state: "Uttar Pradesh",
      category: "Temple visit",
      duration: "45–60 min",
      time: "11:00 AM",
      order: 660,
      dailyBudget: 2300,
      hotelPricePerNight: 900,
      image: "https://www.astroved.com/astropedia/assets/images/temples/dwarkadhish.jpg",
      thumb: "https://www.astroved.com/astropedia/assets/images/temples/dwarkadhish.jpg",
      mapQuery: "Dwarkadhish Temple Mathura"
    },
    vishram: {
      name: "Vishram Ghat",
      city: "Mathura",
      state: "Uttar Pradesh",
      category: "Riverside & aarti",
      duration: "1 hour",
      time: "5:30 PM",
      order: 1050,
      dailyBudget: 2300,
      hotelPricePerNight: 900,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtvakAQS4bSug4uPgILtxrOYoKYrEwgLTIvhngw4Hxkg&s=10",
      thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtvakAQS4bSug4uPgILtxrOYoKYrEwgLTIvhngw4Hxkg&s=10",
      mapQuery: "Vishram Ghat Mathura"
    },
    museum: {
      name: "Government Museum",
      city: "Mathura",
      state: "Uttar Pradesh",
      category: "Art & history",
      duration: "1–2 hours",
      time: "1:00 PM",
      order: 780,
      dailyBudget: 2300,
      hotelPricePerNight: 900,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHWwvxh020peQzNydcYFHTJTOCK5GQI4yzZrHN39QSSQ&s=10",
      thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHWwvxh020peQzNydcYFHTJTOCK5GQI4yzZrHN39QSSQ&s=10",
      mapQuery: "Government Museum Mathura"
    },
    "banke-bihari": {
      name: "Banke Bihari Temple",
      city: "Vrindavan",
      state: "Uttar Pradesh",
      category: "Temple visit",
      duration: "1–2 hours",
      time: "10:00 AM",
      order: 600,
      dailyBudget: 2300,
      hotelPricePerNight: 900,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCUghpjV1llVQBPw8-ZnPWVRZyyH--cI6w389UL0NQog&s=10",
      thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCUghpjV1llVQBPw8-ZnPWVRZyyH--cI6w389UL0NQog&s=10",
      mapQuery: "Banke Bihari Temple Vrindavan"
    },
    "prem-mandir": {
      name: "Prem Mandir",
      city: "Vrindavan",
      state: "Uttar Pradesh",
      category: "Temple & gardens",
      duration: "1–2 hours",
      time: "6:00 PM",
      order: 1080,
      dailyBudget: 2300,
      hotelPricePerNight: 900,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnCP7xIK337G_VUnY1Rl3mO6tLW7MJVG0XGZ-upQqXuA&s=10",
      thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnCP7xIK337G_VUnY1Rl3mO6tLW7MJVG0XGZ-upQqXuA&s=10",
      mapQuery: "Prem Mandir Vrindavan"
    },
    "taj-mahal": {
      name: "Taj Mahal",
      city: "Agra",
      state: "Uttar Pradesh",
      category: "Heritage visit",
      duration: "2–3 hours",
      time: "8:00 AM",
      order: 480,
      dailyBudget: 2300,
      hotelPricePerNight: 900,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfWrTvfV4GWiryTvA_vbgCC_h9sPMgOvbcZKmAe_Rukg&s=10",
      thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfWrTvfV4GWiryTvA_vbgCC_h9sPMgOvbcZKmAe_Rukg&s=10",
      mapQuery: "Taj Mahal Agra"
    },
    "agra-fort": {
      name: "Agra Fort",
      city: "Agra",
      state: "Uttar Pradesh",
      category: "Heritage visit",
      duration: "1–2 hours",
      time: "11:30 AM",
      order: 690,
      dailyBudget: 2300,
      hotelPricePerNight: 900,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYxz9NF5M4TUcziukT1VRu_rSNyqGJ1dojmv7NddaNcg&s=10",
      thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYxz9NF5M4TUcziukT1VRu_rSNyqGJ1dojmv7NddaNcg&s=10",
      mapQuery: "Agra Fort"
    },
    ...window.travelDestinations
  };
  const starterPlan = ["janmabhoomi", "dwarkadhish", "vishram"];
  const pageParams = new URLSearchParams(window.location.search);

  function readHotelSelections() {
    const selections = {};
    try {
      if (pageParams.has("trip")) {
        const sharedSelections = pageParams.get("hotels") || "";
        sharedSelections.split(",").filter(Boolean).forEach((entry) => {
          const [id, option] = entry.split(":");
          if (Object.hasOwn(places, id) && HOTEL_OPTIONS.some((hotel) => hotel.id === option)) {
            selections[id] = option;
          }
        });
        return selections;
      }
      const saved = JSON.parse(localStorage.getItem(HOTEL_SELECTIONS_KEY) || "{}");
      if (!saved || typeof saved !== "object" || Array.isArray(saved)) return selections;
      Object.entries(saved).forEach(([id, option]) => {
        if (Object.hasOwn(places, id) && HOTEL_OPTIONS.some((hotel) => hotel.id === option)) {
          selections[id] = option;
        }
      });
    } catch (error) {
      console.error("Could not read saved hotel selections.", error);
    }
    return selections;
  }

  const hotelSelections = readHotelSelections();

  function readPlan() {
    try {
      const shared = pageParams.get("trip");
      if (shared !== null) {
        return [...new Set(shared.split(",").filter((id) => Object.hasOwn(places, id)))];
      }
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === null) return [...starterPlan];
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) throw new TypeError("Saved itinerary must be a list.");
      return parsed.filter((id, index) => Object.hasOwn(places, id) && parsed.indexOf(id) === index);
    } catch (error) {
      console.error("Could not read the saved TravelTales itinerary.", error);
      return [...starterPlan];
    }
  }

  let itinerary = readPlan().sort((a, b) => places[a].order - places[b].order);
  const startingLocation = document.querySelector("#starting-location");
  const tripDaysInput = document.querySelector("#trip-days");
  const travellerCountInput = document.querySelector("#traveller-count");
  const hotelNightsInput = document.querySelector("#hotel-nights");
  const hotelRoomsInput = document.querySelector("#hotel-rooms");
  const travelStyleInput = document.querySelector("#travel-style");
  const startOptions = document.querySelector("#starting-location-options");
  if (startOptions) {
    const locations = new Set(Object.values(places).flatMap((place) => [`${place.city}, ${place.state}`, place.state]));
    [...locations].sort().forEach((location) => {
      const option = document.createElement("option");
      option.value = location;
      startOptions.append(option);
    });
  }
  if (startingLocation) {
    try {
      startingLocation.value = pageParams.get("from") || localStorage.getItem("traveltales-starting-location") || "";
      if (pageParams.has("from")) localStorage.setItem("traveltales-starting-location", startingLocation.value);
    } catch (error) {
      console.error("Could not read the saved starting location.", error);
      startingLocation.value = pageParams.get("from") || "";
    }
  }
  if (tripDaysInput && travellerCountInput && travelStyleInput) {
    try {
      const savedBudget = JSON.parse(localStorage.getItem("traveltales-budget-settings") || "null");
      if (savedBudget && typeof savedBudget === "object") {
        if (Number.isFinite(savedBudget.days)) tripDaysInput.value = String(savedBudget.days);
        if (Number.isFinite(savedBudget.travellers)) travellerCountInput.value = String(savedBudget.travellers);
        if (hotelNightsInput && Number.isFinite(savedBudget.nights)) hotelNightsInput.value = String(savedBudget.nights);
        if (hotelRoomsInput && Number.isFinite(savedBudget.rooms)) hotelRoomsInput.value = String(savedBudget.rooms);
        if (["1", "1.6", "2.4"].includes(String(savedBudget.style))) travelStyleInput.value = String(savedBudget.style);
      }
    } catch (error) {
      console.error("Could not read the saved trip budget settings.", error);
    }
  }
  if (pageParams.has("days") && tripDaysInput) tripDaysInput.value = pageParams.get("days");
  if (pageParams.has("travellers") && travellerCountInput) travellerCountInput.value = pageParams.get("travellers");
  if (pageParams.has("nights") && hotelNightsInput) hotelNightsInput.value = pageParams.get("nights");
  else if (pageParams.has("days") && hotelNightsInput) hotelNightsInput.value = String(Math.max(0, (Number(pageParams.get("days")) || 1) - 1));
  if (pageParams.has("rooms") && hotelRoomsInput) hotelRoomsInput.value = pageParams.get("rooms");
  if (pageParams.has("style") && travelStyleInput && ["1", "1.6", "2.4"].includes(pageParams.get("style"))) {
    travelStyleInput.value = pageParams.get("style");
  }

  function savePlan() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(itinerary));
    } catch (error) {
      console.error("Could not save the TravelTales itinerary.", error);
      window.alert("Your browser could not save this itinerary. Check that local storage is enabled.");
    }
  }
  if (pageParams.has("trip")) savePlan();

  function updateAddButtons() {
    document.querySelectorAll(".add-place").forEach((button) => {
      const added = itinerary.includes(button.dataset.place);
      button.classList.toggle("is-added", added);
      button.setAttribute("aria-pressed", String(added));
      button.textContent = added ? "✓ Added" : "＋ Add to trip";
    });
  }

  const money = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  });

  function hotelNightlyRate(place, placeId, selectedOption) {
    const baseRate = place.hotelPricePerNight || Math.round((place.dailyBudget || 2200) * 0.4 / 100) * 100;
    const option = HOTEL_OPTIONS.find((hotel) => hotel.id === (selectedOption || hotelSelections[placeId])) || HOTEL_OPTIONS[1];
    return Math.round(baseRate * option.multiplier / 100) * 100;
  }

  function saveHotelSelections() {
    try {
      localStorage.setItem(HOTEL_SELECTIONS_KEY, JSON.stringify(hotelSelections));
    } catch (error) {
      console.error("Could not save hotel selections.", error);
    }
  }

  function updateBudget() {
    const totalElement = document.querySelector("#budget-total");
    if (!totalElement) return;
    const daysInput = tripDaysInput;
    const travellersInput = travellerCountInput;
    const styleInput = travelStyleInput;
    const days = Math.min(30, Math.max(1, Number(daysInput.value) || 1));
    const travellers = Math.min(20, Math.max(1, Number(travellersInput.value) || 1));
    const nights = Math.min(30, Math.max(0, Number(hotelNightsInput && hotelNightsInput.value) || 0));
    const rooms = Math.min(20, Math.max(1, Number(hotelRoomsInput && hotelRoomsInput.value) || 1));
    daysInput.value = String(days);
    travellersInput.value = String(travellers);
    if (hotelNightsInput) hotelNightsInput.value = String(nights);
    if (hotelRoomsInput) hotelRoomsInput.value = String(rooms);
    const style = Number(styleInput.value) || 1;
    const selectedPlaces = itinerary.map((id) => places[id]);
    const dailyRate = selectedPlaces.length
      ? selectedPlaces.reduce((sum, place) => sum + (place.dailyBudget || 2200), 0) / selectedPlaces.length
      : 2200;
    const nightlyRate = itinerary.length
      ? itinerary.reduce((sum, id) => sum + hotelNightlyRate(places[id], id), 0) / itinerary.length
      : Math.round(dailyRate * 0.4 / 100) * 100;
    const baseNightlyRate = itinerary.length
      ? itinerary.reduce((sum, id) => sum + hotelNightlyRate(places[id], id, "comfort"), 0) / itinerary.length
      : Math.round(dailyRate * 0.4 / 100) * 100;
    const dailyNonHotelRate = Math.max(0, dailyRate - baseNightlyRate);
    const hotelCost = nightlyRate * nights * rooms * style;
    const mealsCost = dailyRate * 0.25 * days * travellers * style;
    const transportCost = dailyRate * 0.20 * days * travellers * style;
    const activitiesCost = dailyRate * 0.15 * days * travellers * style;
    const total = Math.round((dailyNonHotelRate * days * travellers + nightlyRate * nights * rooms) * style);
    totalElement.textContent = money.format(total);

    const caption = document.querySelector("#budget-caption");
    if (caption) caption.textContent = `${days} ${days === 1 ? "day" : "days"} · ${travellers} ${travellers === 1 ? "traveller" : "travellers"} · ${nights} hotel ${nights === 1 ? "night" : "nights"} · ${rooms} ${rooms === 1 ? "room" : "rooms"}`;
    const breakdown = document.querySelector("#budget-breakdown");
    if (breakdown) {
      const items = [
        [`Hotel (${money.format(Math.round(nightlyRate * style))} / room / night)`, hotelCost],
        ["Meals", mealsCost],
        ["Local transport", transportCost],
        ["Activities & entry", activitiesCost]
      ];
      breakdown.replaceChildren(...items.map(([label, amount]) => {
        const row = document.createElement("div");
        row.className = "budget-row";
        const rowLabel = document.createElement("span");
        rowLabel.textContent = label;
        const value = document.createElement("strong");
        value.textContent = money.format(Math.round(amount));
        row.append(rowLabel, value);
        return row;
      }));
    }
    try {
      localStorage.setItem("traveltales-budget-settings", JSON.stringify({ days, travellers, nights, rooms, style }));
    } catch (error) {
      console.error("Could not save the trip budget settings.", error);
    }
  }

  function renderPlaceCards() {
    const grid = document.querySelector("#places-grid");
    if (!grid) return;
    const fragment = document.createDocumentFragment();
    Object.entries(places).forEach(([id, place], index) => {
      const article = document.createElement("article");
      article.className = "place-card";
      article.dataset.state = place.state;
      article.dataset.search = `${place.name} ${place.city} ${place.state} ${place.category} ${place.description}`.toLowerCase();
      article.innerHTML = `<div class="place-photo"><img src="${place.image}" alt="${place.name} in ${place.city}, ${place.state}" loading="lazy"><span class="place-number">${String(index + 1).padStart(2, "0")}</span><span class="place-category">${place.category}</span></div><div class="place-info"><div class="place-meta"><span>${place.city}, ${place.state}</span><span>✦ LOCAL PICK</span></div><h3>${place.name}</h3><p>${place.description || "A local favourite with plenty to discover."}</p><div class="place-hotel-rate">Hotel estimate <strong>${money.format(hotelNightlyRate(place))}</strong> / room / night</div><div class="place-card-footer"><span>⏱ ${place.duration}</span><button class="add-place" data-place="${id}" aria-label="Add ${place.name} to trip">＋ Add to trip</button><a class="place-hotel-enquiry" href="stays.html?place=${encodeURIComponent(id)}#hotel-enquiry">Ask about a hotel</a></div></div>`;
      fragment.append(article);
    });
    grid.replaceChildren(fragment);
  }

  renderPlaceCards();

  function renderPlanner() {
    const list = document.querySelector("#itinerary-list");
    if (!list) return;
    const empty = document.querySelector("#empty-plan");
    const heading = document.querySelector("#itinerary-count");
    const mapLink = document.querySelector("#map-link");
    const summary = document.querySelector("#route-summary");
    const routeArt = document.querySelector(".route-art");
    list.replaceChildren();
    if (empty) empty.hidden = itinerary.length > 0;
    if (heading) heading.textContent = itinerary.length ? `${itinerary.length} ${itinerary.length === 1 ? "stop" : "stops"} in your day` : "Your day, at a glance";
    if (summary) summary.textContent = itinerary.length
      ? `${itinerary.length} ${itinerary.length === 1 ? "place" : "places"} across ${new Set(itinerary.map((id) => places[id].state)).size} ${new Set(itinerary.map((id) => places[id].state)).size === 1 ? "region" : "regions"} in your plan.`
      : "Your route will appear here when you add a place.";
    if (routeArt) {
      const routeIndexes = itinerary.length <= 3
        ? itinerary.map((_, index) => index)
        : [0, Math.floor((itinerary.length - 1) / 2), itinerary.length - 1];
      const routeLabels = [".route-label-one", ".route-label-two", ".route-label-three"];
      const routePins = [".pin-one", ".pin-two", ".pin-three"];
      routeLabels.forEach((selector, index) => {
        const label = routeArt.querySelector(selector);
        const place = itinerary[routeIndexes[index]];
        label.hidden = !place;
        if (place) label.textContent = places[place].city.toUpperCase();
      });
      routePins.forEach((selector, index) => {
        const pin = routeArt.querySelector(selector);
        const routePosition = routeIndexes[index];
        pin.hidden = routePosition === undefined;
        if (routePosition !== undefined) pin.textContent = String(routePosition + 1);
      });
    }
    const finishButton = document.querySelector("#finish-planning");
    if (finishButton) finishButton.disabled = itinerary.length === 0;
    const shareButton = document.querySelector("#share-plan");
    if (shareButton) shareButton.disabled = itinerary.length === 0;
    if (mapLink) {
      const stops = itinerary.map((id) => places[id].mapQuery);
      const params = new URLSearchParams({ api: "1" });
      const start = startingLocation ? startingLocation.value.trim() : "";
      if (start || stops.length) {
        params.set("origin", start || stops[0]);
        params.set("destination", stops.length ? stops[stops.length - 1] : start);
        const waypoints = start ? stops.slice(0, -1) : stops.slice(1, -1);
        if (waypoints.length) params.set("waypoints", waypoints.join("|"));
      } else {
        params.set("destination", "Mathura tourist places");
      }
      mapLink.href = `https://www.google.com/maps/dir/?${params.toString()}`;
      mapLink.setAttribute("aria-disabled", String(itinerary.length === 0));
    }

    const timeSlots = ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM", "7:00 PM", "9:00 PM", "10:30 PM"];
    itinerary.forEach((id, index) => {
      const place = places[id];
      const item = document.createElement("article");
      item.className = "itinerary-item";
      item.innerHTML = `<time class="itinerary-time">${timeSlots[index] || "Flexible"}</time><img class="itinerary-thumb" src="${place.thumb || place.image}" alt="" loading="lazy"><div class="itinerary-place"><h3>${place.name}</h3><p>${place.category} · ${place.duration} · ${place.city}</p><p class="itinerary-hotel-rate">Estimated hotel rate: ${money.format(hotelNightlyRate(place, id))} / room / night · <a href="stays.html?place=${encodeURIComponent(id)}&hotel=${hotelSelections[id] || "comfort"}#hotel-enquiry">Enquire</a></p></div><button class="remove-stop" data-remove="${id}" aria-label="Remove ${place.name} from itinerary">×</button>`;
      const hotelPicker = document.createElement("details");
      hotelPicker.className = "hotel-picker";
      hotelPicker.dataset.hotelPicker = id;
      const selectedHotel = HOTEL_OPTIONS.find((hotel) => hotel.id === hotelSelections[id]) || HOTEL_OPTIONS[1];
      const hotelSummary = document.createElement("summary");
      hotelSummary.textContent = `Choose a stay · ${selectedHotel.name} · ${money.format(hotelNightlyRate(place, id))} / night`;
      hotelPicker.append(hotelSummary);
      const hotelNote = document.createElement("p");
      hotelNote.className = "hotel-picker-note";
      hotelNote.textContent = "Illustrative stay styles and estimated prices, not verified hotel listings or live offers.";
      hotelPicker.append(hotelNote);
      const hotelOptions = document.createElement("div");
      hotelOptions.className = "hotel-options";
      HOTEL_OPTIONS.forEach((hotel) => {
        const rate = hotelNightlyRate(place, id, hotel.id);
        const card = document.createElement("article");
        card.className = `hotel-option${selectedHotel.id === hotel.id ? " is-selected" : ""}`;
        const photo = document.createElement("img");
        photo.src = hotel.image;
        photo.alt = hotel.alt;
        photo.loading = "lazy";
        const content = document.createElement("div");
        content.className = "hotel-option-content";
        const name = document.createElement("h4");
        name.textContent = hotel.name;
        const price = document.createElement("p");
        price.textContent = `${money.format(rate)} / room / night`;
        const actions = document.createElement("div");
        actions.className = "hotel-option-actions";
        const selectButton = document.createElement("button");
        selectButton.type = "button";
        selectButton.className = "hotel-select-button";
        selectButton.dataset.hotelOption = hotel.id;
        selectButton.dataset.hotelPlace = id;
        selectButton.setAttribute("aria-pressed", String(selectedHotel.id === hotel.id));
        selectButton.textContent = selectedHotel.id === hotel.id ? "Selected" : "Add this stay";
        const enquiryLink = document.createElement("a");
        enquiryLink.href = `stays.html?place=${encodeURIComponent(id)}&hotel=${hotel.id}#hotel-enquiry`;
        enquiryLink.textContent = "Enquire";
        actions.append(selectButton, enquiryLink);
        content.append(name, price, actions);
        card.append(photo, content);
        hotelOptions.append(card);
      });
      hotelPicker.append(hotelOptions);
      item.querySelector(".itinerary-place").append(hotelPicker);
      list.append(item);
      if (index < itinerary.length - 1) {
        const next = places[itinerary[index + 1]];
        if (place.city !== next.city) {
          const note = document.createElement("div");
          note.className = "route-change";
          note.textContent = `Travel onward to ${next.city}`;
          list.append(note);
        }
      }
    });
    updateAddButtons();
    updateBudget();
  }

  document.querySelectorAll(".menu-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const nav = document.querySelector(".main-nav");
      const open = nav.classList.toggle("is-open");
      button.setAttribute("aria-expanded", String(open));
      button.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    });
  });

  document.querySelectorAll(".add-place").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.place;
      if (itinerary.includes(id)) {
        itinerary = itinerary.filter((stop) => stop !== id);
      } else {
        itinerary.push(id);
      }
      itinerary.sort((a, b) => places[a].order - places[b].order);
      savePlan();
      updateAddButtons();
      renderPlanner();
    });
  });

  const list = document.querySelector("#itinerary-list");
  if (list) {
    list.addEventListener("click", (event) => {
      const hotelButton = event.target.closest("[data-hotel-option]");
      if (hotelButton) {
        hotelSelections[hotelButton.dataset.hotelPlace] = hotelButton.dataset.hotelOption;
        saveHotelSelections();
        renderPlanner();
        const reopenedPicker = list.querySelector(`[data-hotel-picker="${hotelButton.dataset.hotelPlace}"]`);
        if (reopenedPicker) reopenedPicker.open = true;
        return;
      }
      const button = event.target.closest("[data-remove]");
      if (!button) return;
      itinerary = itinerary.filter((id) => id !== button.dataset.remove);
      savePlan();
      renderPlanner();
    });
  }

  const clearButton = document.querySelector("#clear-plan");
  if (clearButton) {
    clearButton.addEventListener("click", () => {
      itinerary = [];
      savePlan();
      renderPlanner();
    });
  }

  const search = document.querySelector("#place-search");
  const stateFilter = document.querySelector("#state-filter");
  const cards = [...document.querySelectorAll(".place-card")];
  const states = [...new Set(Object.values(places).map((place) => place.state).filter(Boolean))].sort();
  if (stateFilter) {
    states.forEach((state) => {
      const option = document.createElement("option");
      option.value = state;
      option.textContent = state;
      stateFilter.append(option);
    });
  }
  const queryParams = new URLSearchParams(window.location.search);
  const requestedState = queryParams.get("state");
  let selectedState = states.includes(requestedState) ? requestedState : "All";
  const requestedCity = queryParams.get("city");
  if (search && requestedCity) search.value = requestedCity;
  if (stateFilter) stateFilter.value = selectedState;

  function filterPlaces() {
    const query = search ? search.value.trim().toLowerCase() : "";
    let visibleCount = 0;
    cards.forEach((card) => {
      const matchesState = selectedState === "All" || card.dataset.state === selectedState;
      const matchesQuery = !query || card.dataset.search.includes(query);
      const visible = matchesState && matchesQuery;
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });
    const count = document.querySelector("#results-count");
    if (count) count.textContent = `Showing ${visibleCount} ${visibleCount === 1 ? "place" : "places"}`;
    const empty = document.querySelector("#empty-results");
    if (empty) empty.hidden = visibleCount > 0;
  }

  if (stateFilter) stateFilter.addEventListener("change", () => {
    selectedState = stateFilter.value;
    filterPlaces();
  });
  if (search) search.addEventListener("input", filterPlaces);
  if (cards.length) filterPlaces();

  ["#trip-days", "#traveller-count", "#hotel-nights", "#hotel-rooms", "#travel-style"].forEach((selector) => {
    const input = document.querySelector(selector);
    if (input) input.addEventListener("input", updateBudget);
    if (input) input.addEventListener("change", updateBudget);
  });
  if (startingLocation) {
    startingLocation.addEventListener("input", () => {
      try {
        localStorage.setItem("traveltales-starting-location", startingLocation.value.trim());
      } catch (error) {
        console.error("Could not save the starting location.", error);
      }
      renderPlanner();
    });
  }

  const reviewDialog = document.querySelector("#review-dialog");
  const reviewForm = document.querySelector("#review-form");
  const reviewError = document.querySelector("#review-error");
  const reviewThanks = document.querySelector("#review-thanks");
  const finishPlanning = document.querySelector("#finish-planning");
  if (reviewDialog && finishPlanning) {
    finishPlanning.addEventListener("click", () => {
      if (itinerary.length) reviewDialog.showModal();
    });
    ["#close-review", "#review-later", "#review-done"].forEach((selector) => {
      const button = document.querySelector(selector);
      if (button) button.addEventListener("click", () => reviewDialog.close());
    });
  }
  if (reviewForm) {
    reviewForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(reviewForm);
      const rating = Number(formData.get("rating"));
      if (rating < 1 || rating > 5) {
        if (reviewError) {
          reviewError.textContent = "Please choose a star rating before sending your review.";
          reviewError.hidden = false;
        }
        return;
      }
      const review = {
        rating,
        comment: String(formData.get("comment") || "").trim(),
        places: [...itinerary],
        submittedAt: new Date().toISOString()
      };
      try {
        localStorage.setItem("traveltales-review", JSON.stringify(review));
      } catch (error) {
        console.error("Could not save the TravelTales review.", error);
        if (reviewError) {
          reviewError.textContent = "Your review could not be saved. Check that browser storage is enabled, then try again.";
          reviewError.hidden = false;
        }
        return;
      }
      if (reviewError) reviewError.hidden = true;
      reviewForm.hidden = true;
      if (reviewThanks) reviewThanks.hidden = false;
    });
  }

  const shareButton = document.querySelector("#share-plan");
  const shareStatus = document.querySelector("#share-status");
  if (shareButton) {
    shareButton.addEventListener("click", async () => {
      const shareUrl = new URL(window.location.href);
      shareUrl.search = "";
      shareUrl.hash = "";
      shareUrl.searchParams.set("trip", itinerary.join(","));
      shareUrl.searchParams.set("hotels", itinerary.map((id) => `${id}:${hotelSelections[id] || "comfort"}`).join(","));
      if (startingLocation && startingLocation.value.trim()) shareUrl.searchParams.set("from", startingLocation.value.trim());
      if (tripDaysInput) shareUrl.searchParams.set("days", tripDaysInput.value);
      if (travellerCountInput) shareUrl.searchParams.set("travellers", travellerCountInput.value);
      if (hotelNightsInput) shareUrl.searchParams.set("nights", hotelNightsInput.value);
      if (hotelRoomsInput) shareUrl.searchParams.set("rooms", hotelRoomsInput.value);
      if (travelStyleInput) shareUrl.searchParams.set("style", travelStyleInput.value);
      const shareData = {
        title: "My TravelTales trip",
        text: `My TravelTales itinerary: ${itinerary.map((id) => places[id].name).join(", ")}`,
        url: shareUrl.toString()
      };
      try {
        if (navigator.share) {
          await navigator.share(shareData);
          if (shareStatus) shareStatus.textContent = "Trip shared.";
        } else if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(shareUrl.toString());
          if (shareStatus) shareStatus.textContent = "Share link copied to clipboard.";
        } else {
          window.prompt("Copy this link to share your trip:", shareUrl.toString());
          if (shareStatus) shareStatus.textContent = "Your share link is ready to copy.";
        }
      } catch (error) {
        if (error.name === "AbortError") return;
        console.error("Could not share the TravelTales itinerary.", error);
        if (shareStatus) shareStatus.textContent = "Could not open sharing. Please try again.";
      }
    });
  }

  document.querySelectorAll(".enquire-stay").forEach((button) => {
    button.addEventListener("click", () => {
      const destinationInput = document.querySelector("#enquiry-destination");
      if (!destinationInput) return;
      destinationInput.value = button.dataset.destination;
      destinationInput.focus();
      document.querySelector("#hotel-enquiry").scrollIntoView({ behavior: "smooth" });
    });
  });

  const advisorForm = document.querySelector("#advisor-form");
  const advisorResult = document.querySelector("#advisor-result");
  if (advisorForm && advisorResult) {
    advisorForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const answers = new FormData(advisorForm);
      const recommendations = {
        heritage: {
          title: "Golden Triangle highlights",
          stops: ["delhi-qutub-minar", "agra-taj-mahal", "rajasthan-amber-fort"],
          description: "Explore Delhi, Agra, and Jaipur for a first taste of India’s monumental history."
        },
        nature: {
          title: "Kerala slow-living escape",
          stops: ["kerala-tea-gardens", "kerala-alappuzha-backwaters"],
          description: "Pair Munnar’s tea-covered hills with a restful stay beside the backwaters."
        },
        coast: {
          title: "Goa coastal reset",
          stops: ["goa-basilica-of-bom-jesus", "goa-palolem-beach"],
          description: "Mix the heritage of Old Goa with relaxed time on the southern coast."
        },
        spiritual: {
          title: "Braj heritage trail",
          stops: ["janmabhoomi", "dwarkadhish", "vishram", "banke-bihari", "prem-mandir"],
          description: "Spend unhurried time around Mathura and Vrindavan’s temples and riverside ghats."
        }
      };
      const recommendation = recommendations[answers.get("region")];
      if (!recommendation) return;
      const requestedDays = Math.max(2, Number(answers.get("days")) || 3);
      const dailyRate = recommendation.stops
        .map((id) => places[id])
        .filter(Boolean)
        .reduce((sum, place, _, matchingPlaces) => sum + place.dailyBudget / matchingPlaces.length, 0);
      const nightlyRate = recommendation.stops
        .map((id) => places[id])
        .filter(Boolean)
        .reduce((sum, place, _, matchingPlaces) => sum + hotelNightlyRate(place) / matchingPlaces.length, 0);
      const availableBudget = Number(answers.get("budget"));
      const baseEstimate = dailyRate * requestedDays - nightlyRate * Math.max(0, requestedDays - 1);
      const affordableMultiplier = availableBudget / baseEstimate;
      const style = affordableMultiplier >= 2.4 ? 2.4 : affordableMultiplier >= 1.6 ? 1.6 : 1;
      const estimatedTotal = Math.round(baseEstimate * style);
      const budgetNote = estimatedTotal > availableBudget
        ? " This estimate is above your budget; consider fewer days or a lower-cost destination."
        : " This estimate fits within your entered budget.";
      const query = new URLSearchParams({
        trip: recommendation.stops.join(","),
        days: String(requestedDays),
        nights: String(Math.max(0, requestedDays - 1)),
        rooms: "1",
        style: String(style)
      });
      advisorResult.replaceChildren();
      const tag = document.createElement("span");
      tag.className = "eyebrow";
      tag.textContent = "A TRIP IDEA FOR YOU";
      const title = document.createElement("h3");
      title.textContent = recommendation.title;
      const description = document.createElement("p");
      description.textContent = recommendation.description;
      const estimate = document.createElement("p");
      estimate.className = "advisor-estimate";
      estimate.textContent = `Planning estimate: ${money.format(estimatedTotal)} per person for ${requestedDays} days. Your budget: ${money.format(availableBudget)}.${budgetNote}`;
      const link = document.createElement("a");
      link.className = "button button-dark";
      link.href = `planner.html?${query.toString()}`;
      link.textContent = "Open this trip idea";
      advisorResult.append(tag, title, description, estimate, link);
      advisorResult.hidden = false;
      advisorResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }

  const tripAdviceForm = document.querySelector("#trip-advice-form");
  const advicePlaceSelect = document.querySelector("#advice-place");
  const adviceResults = document.querySelector("#advice-results");
  const adviceStatus = document.querySelector("#advice-results-status");
  if (tripAdviceForm && advicePlaceSelect && adviceResults && adviceStatus) {
    const groupedPlaces = new Map();
    Object.entries(places).forEach(([id, place]) => {
      if (!groupedPlaces.has(place.state)) groupedPlaces.set(place.state, []);
      groupedPlaces.get(place.state).push({ id, ...place });
    });
    advicePlaceSelect.replaceChildren(new Option("Help me choose anywhere in India", "any"));
    [...groupedPlaces.keys()].sort((a, b) => a.localeCompare(b)).forEach((state) => {
      const group = document.createElement("optgroup");
      group.label = state;
      groupedPlaces.get(state)
        .sort((a, b) => a.name.localeCompare(b.name))
        .forEach((place) => group.append(new Option(place.name, place.id)));
      advicePlaceSelect.append(group);
    });

    tripAdviceForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const answers = new FormData(tripAdviceForm);
      const budget = Number(answers.get("budget"));
      const days = Math.min(30, Math.max(1, Number(answers.get("days")) || 1));
      const style = Number(answers.get("style")) || 1;
      const selectedId = String(answers.get("place"));
      if (!Number.isFinite(budget) || budget < 1000 || !["1", "1.6", "2.4"].includes(String(answers.get("style")))) {
        adviceStatus.textContent = "Enter a budget of at least ₹1,000 and select a travel style.";
        return;
      }

      const selectedPlace = selectedId === "any" ? null : places[selectedId];
      if (selectedId !== "any" && !selectedPlace) {
        adviceStatus.textContent = "We could not find that destination. Choose a place from the list and try again.";
        return;
      }
      const candidates = selectedPlace
        ? Object.entries(places)
          .filter(([, place]) => place.state === selectedPlace.state)
          .map(([id, place]) => ({ id, ...place }))
        : Object.entries(places).map(([id, place]) => ({ id, ...place }));
      const suggestions = candidates
        .map((place) => ({
          ...place,
          estimate: Math.round((place.dailyBudget * days - hotelNightlyRate(place) * Math.max(0, days - 1)) * style),
          isSelected: place.id === selectedId
        }))
        .sort((a, b) => {
          if (selectedPlace && a.isSelected !== b.isSelected) return a.isSelected ? -1 : 1;
          const aFits = a.estimate <= budget;
          const bFits = b.estimate <= budget;
          if (aFits !== bFits) return aFits ? -1 : 1;
          return a.estimate - b.estimate || a.name.localeCompare(b.name);
        })
        .slice(0, selectedPlace ? 4 : 6);
      const fitCount = suggestions.filter((place) => place.estimate <= budget).length;

      adviceResults.replaceChildren();
      suggestions.forEach((place) => {
        const card = document.createElement("article");
        card.className = "advice-place-card";
        const image = document.createElement("img");
        image.src = place.image;
        image.alt = `View of ${place.name}`;
        image.loading = "lazy";
        const content = document.createElement("div");
        content.className = "advice-place-content";
        const location = document.createElement("span");
        location.className = "advice-place-location";
        location.textContent = `${place.city} · ${place.state}`;
        const title = document.createElement("h3");
        title.textContent = place.name;
        const description = document.createElement("p");
        description.textContent = place.description || `${place.category} destination to explore.`;
        const estimate = document.createElement("p");
        estimate.className = "advice-place-estimate";
        estimate.textContent = `${money.format(place.estimate)} estimated per person`;
        const fit = document.createElement("span");
        fit.className = place.estimate <= budget ? "advice-budget-fit" : "advice-budget-over";
        fit.textContent = place.estimate <= budget ? "Within your budget" : `${money.format(place.estimate - budget)} above budget`;
        const query = new URLSearchParams({
          trip: place.id,
          days: String(days),
          nights: String(Math.max(0, days - 1)),
          rooms: "1",
          style: String(style)
        });
        const plannerLink = document.createElement("a");
        plannerLink.className = "button button-dark";
        plannerLink.href = `planner.html?${query.toString()}`;
        plannerLink.textContent = "Plan this trip";
        content.append(location, title, description, estimate, fit, plannerLink);
        card.append(image, content);
        adviceResults.append(card);
      });

      const chosenLabel = selectedPlace ? ` Starting with ${selectedPlace.name},` : "";
      adviceStatus.textContent = fitCount
        ? `${chosenLabel} ${fitCount} suggestion${fitCount === 1 ? "" : "s"} shown fit your ${money.format(budget)} budget for ${days} days. Estimates are per person.`
        : `${chosenLabel} none of the closest suggestions fit your ${money.format(budget)} budget for ${days} days. The lowest-cost options are shown; try a shorter trip or Budget travel style.`;
      adviceResults.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  const hotelEnquiryForm = document.querySelector("#hotel-enquiry-form");
  const hotelEnquiryStatus = document.querySelector("#enquiry-status");
  if (hotelEnquiryForm && hotelEnquiryStatus) {
    const checkInInput = hotelEnquiryForm.elements.namedItem("checkin");
    const checkOutInput = hotelEnquiryForm.elements.namedItem("checkout");
    const enquiryDestinationInput = hotelEnquiryForm.elements.namedItem("destination");
    const enquiryRateInput = hotelEnquiryForm.elements.namedItem("estimatedHotelRate");
    const requestedEnquiryPlace = pageParams.get("place");
    const requestedHotelOption = HOTEL_OPTIONS.some((hotel) => hotel.id === pageParams.get("hotel"))
      ? pageParams.get("hotel")
      : "comfort";
    let enquiryHotelOption = requestedHotelOption;
    const setEnquiryPlace = (id) => {
      const place = places[id];
      if (!place) {
        if (enquiryRateInput) enquiryRateInput.value = "";
        return;
      }
      enquiryDestinationInput.value = `${place.city}, ${place.state}`;
      enquiryHotelOption = id === requestedEnquiryPlace ? requestedHotelOption : "comfort";
      if (enquiryRateInput) enquiryRateInput.value = String(hotelNightlyRate(place, id, enquiryHotelOption));
    };
    if (requestedEnquiryPlace && places[requestedEnquiryPlace]) setEnquiryPlace(requestedEnquiryPlace);
    enquiryDestinationInput.addEventListener("input", () => {
      const destination = enquiryDestinationInput.value.trim().toLowerCase();
      const match = Object.entries(places).find(([, place]) =>
        [place.name, place.city, `${place.city}, ${place.state}`].some((label) => label.toLowerCase() === destination)
      );
      if (match) setEnquiryPlace(match[0]);
      else if (enquiryRateInput) enquiryRateInput.value = "";
    });
    const today = new Date();
    const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    checkInInput.min = localToday;
    checkOutInput.min = localToday;
    checkInInput.addEventListener("change", () => {
      checkOutInput.min = checkInInput.value || localToday;
      if (checkOutInput.value && checkOutInput.value <= checkInInput.value) checkOutInput.value = "";
    });
    hotelEnquiryForm.addEventListener("submit", (event) => {
      event.preventDefault();
      hotelEnquiryStatus.textContent = "";
      if (checkOutInput.value <= checkInInput.value) {
        hotelEnquiryStatus.textContent = "Check-out must be after check-in.";
        checkOutInput.focus();
        return;
      }
      const formData = new FormData(hotelEnquiryForm);
      const enquiry = {
        destination: String(formData.get("destination")).trim(),
        checkin: formData.get("checkin"),
        checkout: formData.get("checkout"),
        guests: Number(formData.get("guests")),
        style: formData.get("style"),
        estimatedHotelRate: Number(formData.get("estimatedHotelRate")) || null,
        hotelStyle: HOTEL_OPTIONS.find((hotel) => hotel.id === enquiryHotelOption).name,
        email: String(formData.get("email")).trim(),
        requests: String(formData.get("requests") || "").trim(),
        createdAt: new Date().toISOString()
      };
      try {
        const existing = JSON.parse(localStorage.getItem("traveltales-hotel-enquiries") || "[]");
        if (!Array.isArray(existing)) throw new TypeError("Saved enquiries must be a list.");
        existing.push(enquiry);
        localStorage.setItem("traveltales-hotel-enquiries", JSON.stringify(existing));
        hotelEnquiryStatus.textContent = "Enquiry saved on this device only. It has not been sent to a hotel.";
        hotelEnquiryForm.reset();
        checkInInput.min = localToday;
        checkOutInput.min = localToday;
      } catch (error) {
        console.error("Could not save the hotel enquiry.", error);
        hotelEnquiryStatus.textContent = "Could not save this enquiry in your browser. Please check browser storage and try again.";
      }
    });
  }

  renderPlanner();
})();
