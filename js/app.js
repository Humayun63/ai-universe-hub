// FOR SORT CARDS
let isSorted = false;
// FUNCTION FOR LOAD DATA WITH API
const loadData = async (isClicked, isSort) => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
        const data = await res.json();
        showData(data.data.tools, isClicked, isSort);
    } catch (error) {
        console.log(error);
    }
};

// FUNCTION FOR SHOW DATA IN DOM
const showData = (tools, isClicked, isSort) => {
    const seeMorebtn = document.getElementById('see-more-btn');
    const sortByBtn = document.getElementById('sort-by-btn');
    sortByBtn.classList.remove('d-none');
    if (isSort) {
        tools = tools.sort((a, b) => new Date(a.published_in) - new Date(b.published_in));
    }
    if (!isClicked) {
        tools = tools.slice(0, 6);
    }
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = '';
    tools.forEach(tool => {
        const div = document.createElement('div');
        div.classList.add('col');
        const featureId = `featureForId${tool.id}`;
        div.innerHTML = `
            <div class="card h-100">
                <img src="${tool.image}" class="card-img-top" alt="${tool.name} image">
                <div class="card-body">
                    <h5 class="card-title">Features</h5>
                    <ol id="${featureId}">
                    </ol>
                </div>
                <div class="card-footer bg-body d-flex justify-content-between align-items-center">
                    <div>
                        <h3>${tool.name}</h3>
                        <p>
                            <i class="fa-solid fa-calendar-days"></i>
                            ${tool.published_in}
                        </p>
                    </div>
                    <!-- CARD FOOTER BUTTON -->
                    <div>
                        <button class="btn btn-warning rounded-circle" onclick="showModal('${tool.id}')" data-bs-toggle="modal" data-bs-target="#detailsModal">
                            <i class="fa-solid fa-arrow-right text-danger"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.getElementById('spinner').classList.add('d-none');
        cardsContainer.appendChild(div);

        // // FEATURES INSERTING
        const featuresArray = tool.features;
          const featureListContainer = document.getElementById(featureId);
          for (const item of featuresArray) {
              const li = document.createElement('li');
              li.innerText = item;
              featureListContainer.appendChild(li);
          }

        if (isClicked) {
            seeMorebtn.classList.add('d-none');
        } else {
            seeMorebtn.classList.remove('d-none');
        }
    });

}

//CLICK HANDLER FOR SEE MORE BUTTON 
document.getElementById('see-more-btn').addEventListener('click', function () {
    if (isSorted) {
        loadData(true, true);
    } else {
        loadData(true);
    }
})

// CLICK HANDLER FOR SORT BUTTON
document.getElementById('sort-by-btn').addEventListener('click', function () {
    loadData(false, true);
    isSorted = true;
})
loadData();