
  var Products = []
  {%- for block in section.blocks -%}
  {% assign cust_product =  all_products[block.settings.product_s] %}
    Products.push({{ cust_product.variants[0] | json }});   
  {% endfor %}
  var Charms = [];
  {% capture charms_tag %}Sub_Alphabet,Sub_Roman Numerals,Sub_Zodiac Signs,Sub_Birthstones,Sub_Symbols{% endcapture %}
  {% assign charms_tag = charms_tag | split: ',' %}                
  {% for cust_tag in charms_tag %}
	{% paginate collections.all.products by 1000 %}
  		{% for product in collections.all.products %}
  			{% if product.tags contains cust_tag %} 
				Charms.push({{ product.variants[0] | json }});
  			{% endif %}
  		{% endfor %}
  	{% endpaginate %}
  {% endfor %}  	
	var Chains = []
  	{% paginate collections.all.products by 1000 %}
      {% for product in collections.all.products %}
          {% for tag in product.tags %}
              {% if tag contains 'Sub_Layered Necklace' %} 
                  Chains.push({{ product.variants[0] | json }});
              {% endif %}
          {% endfor %}
      {% endfor %}
  	{% endpaginate %}
  
  String.prototype.splice = function (idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
  };
  dollarUSLocale = Intl.NumberFormat('en-US');

  $(document).ready(function () {
    var locket_id = '';
    const queryString = window.location.search;
    if (queryString) {
      localStorage.setItem('locketID', queryString.split('&')[0].split('=')[1]);
      locket_id = localStorage.getItem('locketID')
    }else{ 
       locket_id = localStorage.getItem('locketID')
      if (locket_id) {
        locket_id = locket_id;
      } else {
        var idSwap = localStorage.setItem("locketID", "40796439478458");
        locket_id = localStorage.getItem('locketID')
      }
    }
      var locket_product = Products.find(x => x.id === Number(locket_id))
      var product_total_text = locket_product.price.toString();
      var cust_title = locket_product.name;
      var price = "$" + product_total_text.splice(-2, 0, ".");
      var productData =
          `<div class="locket-cart-inner" id="${locket_id}">
            <div>
            <img src="${locket_product.featured_image.src}" alt="" />
              </div>
            <div class="locket-cart-info">
            <span class="p-title">${locket_product.name}</span>
            <span class="p-price">${price}</span>
              </div>
              </div>`
      $(".pendant_image").attr("src", locket_product.featured_image.src);
      $('#locketShape').text(cust_title.split('-')[0]);
      $('.locket-cart').append(productData).show('slow');
    
  });
  $(document).on('click', '.ad_to_cart', function () {
//     var productImage = $(this).find('.ad_to_cart_id').find("img").attr("src");
    $(this).addClass("active");
    $(this).siblings().removeClass("active");
    var ID = $(this).find('.ad_to_cart_id').attr("data-id");
    var custTitle = $(this).find('.ad_to_cart_id').attr("data-title");
    var product = Products.find(x => x.id === Number(ID));
    let product_total_text = product.price.toString();
    var price = "$" + product_total_text.splice(-2, 0, ".");
    var productData = `<div class="locket-cart-inner" id="${ID}">
      <div>
      <img src="${product.featured_image.src}" alt="" />
        </div>
      <div class="locket-cart-info">
      <span class="p-title">${product.name}</span>
      <span class="p-price">${price}</span>
        </div>
        </div>`
     $(".pendant_image").attr("src", product.featured_image.src);
    var locket_id = localStorage.getItem('locketID');
    if (locket_id == ID) {
      return false;
    } else {
      var divId = "#" + locket_id;
      $(divId).remove();
      $('.locket-cart').append(productData).show('slow');
      localStorage.setItem("locketID", ID);
    }
    $('#locketShape').text(custTitle);
  })
  //Chain
  $(document).ready(function () {
    const queryString = window.location.search;
    var chain_id = '';
    if (queryString) {
      localStorage.setItem('chainID', queryString.split('&')[1].split('=')[1]);
      chain_id = localStorage.getItem('chainID');
    }else{
      chain_id = localStorage.getItem('chainID')
      if (chain_id) {
        chain_id = chain_id;
      } else {
        localStorage.setItem("chainID", "40796448096442");
        chain_id = localStorage.getItem('chainID')
      }
    }
    var chain_product = Chains.find(x => x.id === Number(chain_id))
    var cust_title = chain_product.name;
    var product_total_text = chain_product.price.toString();
    var price = "$" + product_total_text.splice(-2, 0, ".");
    var productData =
        `<div class="locket-cart-inner" id="${chain_id}">
<div>
<img src="${chain_product.featured_image.src}" alt="" />
  </div>
<div class="locket-cart-info">
<span class="p-title"> ${chain_product.name}</span>
<span class="p-price">${price}</span>
  </div>
  </div>`
    $('#chainShape').text(cust_title.split('-')[0]);
    $('.locket-cart').append(productData).show('slow');
  });
  
  $(document).on('click', '.ad_to_cart_chain_size', function () {
    let size = $(this).attr('data-id');
    
    $(this.parentNode).addClass('active');
    $(this.parentNode).siblings().removeClass("active");
    localStorage.setItem("chainSize", size);
    

    /*    var productImage = $(this).find('.ad_to_cart_id_chain').find("img").attr("src");
     $("#productImage").attr("src", productImage);
    $(this).addClass("active");
    $(this).siblings().removeClass("active");
    var ID = $(this).find('.ad_to_cart_id_chain').attr("data-id");
    var custTitle = $(this).find('.ad_to_cart_id_chain').attr("data-title");
    var product = Chains.find(x => x.id === Number(ID));
    let product_total_text = product.price.toString();
    var price = "$" + product_total_text.splice(-2, 0, ".");
    var productData = `<div class="locket-cart-inner" id="${ID}">
<div>
<img src="${product.featured_image.src}" alt="" />
  </div>
<div class="locket-cart-info">
<span class="p-title">${product.name}</span>
<span class="p-price">${price}</span>
  </div>
  </div>`
    var locket_id = localStorage.getItem('chainID');
    if (locket_id == ID) {
      return false;
    } else {
      var divId = "#" + locket_id;
      $(divId).remove();
      $('.locket-cart').append(productData).show('slow');
      localStorage.setItem("chainID", ID);
    }

    $('#chainShape').text(custTitle); */
  })
  //Charms Code here
  $(document).ready(function () {
    var testing = localStorage.getItem("charmsID");
    const queryString = window.location.search;
    if (!queryString) {
      var charmsArray = JSON.parse(testing);
      if (charmsArray) {
        charmsArray = charmsArray;
      } else {
        charmsArray = [];
        localStorage.setItem("charmsID", JSON.stringify(charmsArray))
      }
      for (let i = 0; i < charmsArray.length; i++) {
        var chain_product = Charms.find(x => x.id === Number(charmsArray[i]))
        let product_total_text = chain_product.price.toString();
        var price = "$" + product_total_text.splice(-2, 0, ".");
        var productData =
            `<div class="locket-cart-inner" id="${chain_product.id}">
          <div>
          <img src="${chain_product.featured_image.src}" alt="" />
            </div>
          <div class="locket-cart-info">
          <span class="p-title"> ${chain_product.name}</span>
          <span class="p-price">${price}</span>
          <span class="p-del" data-id="${chain_product.id}"> <img src="{{ 'trash.svg' | asset_url }}" alt="heart" /></span>
            </div>
            </div>`
        $('.locket-cart').append(productData).show('slow');
      }
    }
  });
  $(document).on('click', '.ad_to_cart_id_charms', function () {
    var ID = $(this).attr("data-id");
    var custTitle = $(this).attr("data-title");
    var product = Charms.find(x => x.id === Number(ID));
    let product_total_text = product.price.toString();
    var price = "$" + product_total_text.splice(-2, 0, ".");
    var productData = `<div class="locket-cart-inner" id="${ID}">
          <div>
          <img src="${product.featured_image.src}" alt="" />
            </div>
          <div class="locket-cart-info">
          <span class="p-title">${product.name}</span>
          <span class="p-price">${price}</span>
          <span class="p-del" data-id="${product.id}"> <img src="{{ 'trash.svg' | asset_url }}" alt="heart" /></span>
            </div>
            </div>`
    
    $('.locket-cart').append(productData).show('slow');
    var charmsArray = JSON.parse(localStorage.getItem("charmsID"));

    if(charmsArray){
      charmsArray.push(ID);
      localStorage.setItem("charmsID", JSON.stringify(charmsArray))
    }else{
      	let data =  
    	localStorage.setItem("charmsID", JSON.stringify(ID))
    }
    
    
  })
  
  $(document).on('click', 'body *', function () {
    var totalPrice = '';
    var locket_id = Products.find(x => x.id === Number(localStorage.getItem('locketID')));
    var locket_price = Number(locket_id.price);
    var chain_id = Chains.find(x => x.id === Number(localStorage.getItem('chainID')));
    var chain_price = Number(chain_id.price);
    var charms_id = JSON.parse(localStorage.getItem('charmsID'));
    totalPrice = locket_price + chain_price;
    if(charms_id){
      for (let i = 0; i < charms_id.length; i++) {
        var charms_data = Charms.find(x => x.id === Number(charms_id[i]))
        totalPrice += charms_data.price;
      }
    }
    let product_total_text = totalPrice.toString();
    var result = "$" + product_total_text.splice(-2, 0, ".");
    $("#Total_price").text(result);
  });
  //Clear Charms
  $(document).on('click', '.clear_charms', function () {
    var charms_id = JSON.parse(localStorage.getItem('charmsID'));
    for (let i = 0; i < charms_id.length; i++) {
      let divID = "#" + charms_id[i];
      $(divID).remove();
    }
    let charmsArray = [];
    localStorage.setItem("charmsID", JSON.stringify(charmsArray))
  })
  $(document).on('click', '.p-del', function () {
    var divId = "#" + $(this).attr('data-id');
    
    $(divId).fadeOut("slow")
    
    var charmsArray = JSON.parse(localStorage.getItem("charmsID"));
    charmsArray.pop($(this).attr('data-id'));
    localStorage.setItem("charmsID", JSON.stringify(charmsArray))
    
    setTimeout(function() {
    	$(divId).remove();
    }, 2000);
//     $("#productImage").attr("src", "//cdn.shopify.com/s/files/1/0510/9488/0442/products/LC2134-Y-V1.jpg?v=1637979118");
  });
  $(document).ready(function () {
    var totalPrice = '';
    var locket_id = Products.find(x => x.id === Number(localStorage.getItem('locketID')));
    var locket_price = Number(locket_id.price);
    var chain_id = Chains.find(x => x.id === Number(localStorage.getItem('chainID')));
    var chain_price = Number(chain_id.price);
    var charms_id = JSON.parse(localStorage.getItem('charmsID'));
    totalPrice = locket_price + chain_price;
    if(charms_id){
      for (let i = 0; i < charms_id.length; i++) {
        var charms_data = Charms.find(x => x.id === Number(charms_id[i]))
        totalPrice += charms_data.price;
      }
    }
    let product_total_text = totalPrice.toString();
    var result = "$" + product_total_text.splice(-2, 0, ",");
    $("#Total_price").text(result);
  });
  
  $(document).on('click', '.product__submit__add', function () {
    
    if(localStorage.getItem('chainSize')){
        $('.loader').append('<i class="fa fa-spinner fa-spin"></i>');
        var chamsID = JSON.parse(localStorage.getItem("charmsID"));
        var itemsArray = [];
        for (let i = 0; i < chamsID.length; i++) {
          var feed = { quantity: "1", id: chamsID[i] };
          itemsArray.push(feed);
        }
        var chainID = { quantity: "1", id: localStorage.getItem("chainID") };
        itemsArray.push(chainID);
        var locket_ID = { quantity: "1", id: localStorage.getItem("locketID"),  };
        itemsArray.push(locket_ID);

        $.ajax({
          type: 'POST',
          url: '/cart/add.js',
          data: {
            items: itemsArray
          },
          properties: { 'Chain Size' : localStorage.getItem("chainSize") },
          dataType: 'json',
          success: function (response) {
            window.location.href = "https://justdesi.com/cart";
          }
        });
      }else{
      	alert("Please select chain size");
    	return false;
    }
});
  $(document).on("click", '.share_btn', function () {
    var charmsId = JSON.parse(localStorage.getItem('charmsID'));
    var locketID = localStorage.getItem('locketID');
    var chainID = localStorage.getItem('chainID');
    var queryString = "https://justdesi.com/pages/locket?locketID=" + locketID + "&chainID=" + chainID + "&charms=" + charmsId.toString();
    var shareLink = queryString;
    var sampleTextarea = document.createElement("textarea");
    document.body.appendChild(sampleTextarea);
    sampleTextarea.value = shareLink; //save main text in it
    sampleTextarea.select(); //select textarea contenrs
    document.execCommand("copy");
    document.body.removeChild(sampleTextarea);
    $(".tooltiptext").fadeIn('slow');
    setTimeout(function() {
    	$('.tooltiptext').fadeOut('slow');
    }, 1500);
    
  });
  $(document).ready(function () {
    const queryString = window.location.search;
    if (queryString) {
      let productArray = queryString.split('&')[2].split('=')[1].split(',');
//        		localStorage.setItem('locketID', queryString.split('&')[0].split('=')[1]);
// 			localStorage.setItem('chainID', queryString.split('&')[1].split('=')[1]);
      localStorage.setItem('charmsID', JSON.stringify(productArray))
      for (let index = 0; index < productArray.length; index++) {
        const ID = productArray[index];
        var product = Charms.find(x => x.id === Number(ID))
        let product_total_text = product.price.toString();
        var price = "$" + product_total_text.splice(-2, 0, ".");
        var productData =
            `<div class="locket-cart-inner" id="${ID}">
              <div>
                <img src="${product.featured_image.src}" alt="" />
                  </div>
                <div class="locket-cart-info">
                <span class="p-title">${product.name}</span>
                <span class="p-price">${price}</span>
                <span class="p-del" data-id="${product.id}"> <img src="{{ 'trash.svg' | asset_url }}" alt="heart"/></span>
               </div>
              </div>`
        $('.locket-cart').append(productData).show('slow');;
      }
    } else {
      return false;
    }
  });
  
  var zoom = 1;
  $('.zoom-init').on('click', function () {
    $('.zoom-init').addClass('active');
    $('.zoom-out').removeClass('active');
    zoom += 0.1;
    $('#locket_image_product').css('transform', 'scale(' + zoom + ')');
  });
  $('.zoom-out').on('click', function () {
    zoom -= 0.1;
    if(zoom > '1'){
      $('.zoom-init').removeClass('active');
      $('.zoom-out').addClass('active');
      $('#locket_image_product').css('transform', 'scale(' + zoom + ')');
    }
  });

  var zoomer = document.getElementById('zoomer');
  var hubblepic = document.getElementById('locket_image_product');
  function deepdive(){ 
    zoomlevel = zoomer.valueAsNumber;
    hubblepic.style.webkitTransform = "scale("+zoomlevel+")";
    hubblepic.style.transform = "scale("+zoomlevel+")";
    $('#locket_image_product').css('transform', 'scale(' + zoomlevel + ')');
  }
  

