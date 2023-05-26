const showModal = (id) =>{
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => dynamicModal(data.data))
    .catch(error => console.log(error));
};

// DYNAMIC MODAL CREATION
const dynamicModal = (data) =>{
    const accuracy = data.accuracy.score;
    const modalCardContainer = document.getElementById('modal-card-container');
    modalCardContainer.innerHTML = '';
    // CREATING MODAL FIRST DIV
    const firstDiv = document.createElement('div');
    firstDiv.classList.add('col');
    firstDiv.innerHTML = `
        <div class="card h-100 bg-danger-subtle border border-danger">
            <div class="card-body">
                <h5 class="card-title">${data.description}</h5>
                <div class="row row-cols-1 row-cols-lg-3 g-4 my-1">
                    <div class="col text-center mb-3 mb-sm-0">
                        <div class="card h-100">
                            <div class="card-body text-success">
                                <p>${data.pricing !== null ? data.pricing[0].price : 'Free of Cost'}
                                <br>${data.pricing !== null ? data.pricing[0].plan : 'Basic'}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col text-center mb-3 mb-sm-0">
                        <div class="card h-100">
                            <div class="card-body text-warning">
                                <p>${data.pricing !== null ? data.pricing[1].price : 'Free of Cost'}
                                <br>${data.pricing !== null ? data.pricing[1].plan : 'Pro'}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col text-center mb-3 mb-sm-0">
                        <div class="card h-100">
                            <div class="card-body text-danger">
                                <p>${data.pricing !== null ? data.pricing[2].price : 'Free of Cost'}
                                <br>${data.pricing !== null ? data.pricing[2].plan : 'Enterprise'}</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row row-cols-1 row-cols-md-2 g-3 mt-2">
                    <div class="col">
                        <h6>Features</h6>
                        <ul id="features-list">
                        </ul>
                    </div>
                    <div id="integration-container" class="col">
                        <h6>Integrations</h6>
                    </div>
                </div>
                

            </div>
        </div>
    `;
    modalCardContainer.appendChild(firstDiv);

    // FEATURES LIST CREATING 
    const features = data.features;
    const featuresList = document.getElementById('features-list');
	for (const key in features) {
        const li = document.createElement('li');
        li.innerText = features[key].feature_name;
        featuresList.appendChild(li);
    }

    // INTEGRATION LIST CREATING
    const integrations = data.integrations;
    const integrationContainer = document.getElementById('integration-container');
	if(integrations === null){
        const p = document.createElement('p');
        p.innerText = 'No data Found';
        integrationContainer.appendChild(p);
        console.log('working')
    }else{
        const ul = document.createElement('ul');
        for (const item of integrations) {
            const li = document.createElement('li');
             li.innerText = item;
             ul.appendChild(li);
        }
        integrationContainer.appendChild(ul);
    }
    
    // CREATING MODAL SECOND DIV
    const secondDiv = document.createElement('div');
    secondDiv.classList.add('col');
    secondDiv.innerHTML = `
        <div class="card h-100">
            <div class="p-1" id="secondDivHeader">
                <img src="${data.image_link[0]}" class="card-img-top" alt="...">
            </div>
            <div class="card-body text-center">
                <h5 class="card-title">${data.input_output_examples !== null ? data.input_output_examples[0].input : 'Can you give any example?'}</h5>
                <p class="card-text">${data.input_output_examples !== null ? data.input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}</p>
            </div>
        </div>
    `;
    modalCardContainer.appendChild(secondDiv);
    
    // ACCURACY TAG INSERTING!
    const secondDivHeader = document.getElementById('secondDivHeader');
    if(accuracy !== null){
        const span = document.createElement('span');
        span.classList.add('bg-danger', 'py-2', 'px-3', 'text-white', 'rounded', 'position-absolute');
        span.setAttribute('style', 'top:10px; right:10px');
        span.innerHTML = `
            ${accuracy * 100}% accuracy
        `;
        secondDivHeader.appendChild(span);
    }
}