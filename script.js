const API_ENDPOINT = "https://restcountries.com/v3.1/all";
const results = document.getElementById('results');
const search_input = document.getElementById('search');
let search_term = '';
let countries;
let datas;
const displayCountries = () => {
  fetch(API_ENDPOINT)
    .then((data) => {
      return data.json();
    })
    .then((countries) => {
      let results = "";
      countries.map(function (country) {
        results += `
        <div class="card">
          
          <img src=${country.flags.png} alt="">  
          <h2 class="card-title">${country.name.common}</h2> 
          <div class=card-desc>
          <ul>
          <li><strong id:"">Capital: </strong>${country.capital}</li>
          <li><strong>Continent: </strong>${country.continents}</li>
          <li><strong>Region: </strong>${country.region}</li>
          <li><strong>Population: </strong>${country.population}</li>
          <li><strong>Currency: </strong>${country.currencies}</li>

          </ul>
          </div>  
        </div>
`; 
      });
      document.querySelector(".cards").innerHTML = results;
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      console.log("Fetch successful");
    });
};
displayCountries();

// search functionality
const fetchCountries = async () => {
  datas = await fetch(
      'https://restcountries.com/v3.1/all'
  ).then(res => res.json());
  console.log(datas);
};

const showCountries = async () => {
  results.innerHTML = '';

  await fetchCountries();

  const ul = document.createElement('ul');
  ul.classList.add('countries');

  datas
      .filter(data =>
          data.name.toLowerCase().includes(search_term.toLowerCase())
      )
      .forEach(data => {
          const li = document.createElement('li');
          li.classList.add('country-item');

          const country_flag = document.createElement('img');
          country_flag.src = country.flag;
          country_flag.classList.add('country-flag');

          const country_name = document.createElement('h3');
          country_name.innerText = country.name;
          country_name.classList.add('country-name');

          const country_info = document.createElement('div');
          country_info.classList.add('country-info');

          const country_population = document.createElement('h2');
          country_population.innerText = numberWithCommas(country.population);
          country_population.classList.add('country-population');

          const country_population_text = document.createElement('h5');
          country_population_text.innerText = 'Population';
          country_population_text.classList.add('country-population-text');

          country_info.appendChild(country_population);
          country_info.appendChild(country_population_text);

          li.appendChild(country_flag);
          li.appendChild(country_name);
          li.appendChild(country_info);

          ul.appendChild(li);
      });

  results.appendChild(ul);
};

showCountries();

search_input.addEventListener('input', e => {
  search_term = e.target.value;
  showCountries();
});

// From StackOverflow https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// From StackOverflow https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// pagination
jQuery(document).ready(function () {

  //Pagination JS
  //how much items per page to show
  var show_per_page = 4; 
  //getting the amount of elements inside pagingBox div
  var number_of_items = $('.cards').children().size();
  //calculate the number of pages we are going to have
  var number_of_pages = Math.ceil(number_of_items/show_per_page);
  
  //set the value of our hidden input fields
  $('#current_page').val(0);
  $('#show_per_page').val(show_per_page);
  
  //now when we got all we need for the navigation let's make it '
  
  /* 
  what are we going to have in the navigation?
    - link to previous page
    - links to specific pages
    - link to next page
  */
  var navigation_html = '<a class="previous_link" href="javascript:previous();">Prev</a>';
  var current_link = 0;
  while(number_of_pages > current_link){
    navigation_html += '<a class="page_link" href="javascript:go_to_page(' + current_link +')" longdesc="' + current_link +'">'+ (current_link + 1) +'</a>';
    current_link++;
  }
  navigation_html += '<a class="next_link" href="javascript:next();">Next</a>';
  
  $('#page_navigation').html(navigation_html);
  
  //add active_page class to the first page link
  $('#page_navigation .page_link:first').addClass('active_page');
  
  //hide all the elements inside pagingBox div
  $('.cards').children().css('display', 'none');
  
  //and show the first n (show_per_page) elements
  $('.cards').children().slice(0, show_per_page).css('display', 'block');

});



//Pagination JS

function previous(){

new_page = parseInt($('#current_page').val()) - 1;
//if there is an item before the current active link run the function
if($('.active_page').prev('.page_link').length==true){
  go_to_page(new_page);
}

}

function next(){
new_page = parseInt($('#current_page').val()) + 1;
//if there is an item after the current active link run the function
if($('.active_page').next('.page_link').length==true){
  go_to_page(new_page);
}

}
function go_to_page(page_num){
//get the number of items shown per page
var show_per_page = parseInt($('#show_per_page').val());

//get the element number where to start the slice from
start_from = page_num * show_per_page;

//get the element number where to end the slice
end_on = start_from + show_per_page;

//hide all children elements of pagingBox div, get specific items and show them
$('.cards').children().css('display', 'none').slice(start_from, end_on).css('display', 'block');

/*get the page link that has longdesc attribute of the current page and add active_page class to it
and remove that class from previously active page link*/
$('.page_link[longdesc=' + page_num +']').addClass('active_page').siblings('.active_page').removeClass('active_page');

//update the current page input field
$('#current_page').val(page_num);
}
