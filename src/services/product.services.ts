import instance from './api'

export const getProductCategory = (params: any) => {
  return instance.get('/', {
    params
  })
}

export const getProductTags = (params: any) => {
  return instance.get('/tags', {
    params
  })
}

export const getProducts = (params: any) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        data: {
          data: [
            {
              id: '64292d1b01f4fe96f272b208',
              name: 'Slim Fit Linen suit trousers',
              tags: ['HOT', 'NEW', 'SALE'],
              types: ['trousers'],
              brand: 'H&M',
              discount_amount: 1000,
              discount_percent: 0.3,
              gender: 'MEN',
              price: 1000000,
              description:
                'These slim fit suit trousers are made from breathable linen fabric, perfect for warmer weather. Designed to flatter and elongate the legs, they feature a flat front and slim leg. Available in versatile color options, they can be dressed up or down for any occasion. Pair with a crisp white shirt and matching linen suit jacket for a chic and polished look, or with a casual shirt for a more relaxed feel.Easy to care for, these trousers are the ultimate summer essential.',
              photos: [
                'https://drive.google.com/file/d/1mMcb1S14A7gHuaj5LnCssBP-6uFowDEq/view?usp=share_link',
                'https://huuvuongassert.blob.core.windows.net/photo/Kidd/2-piece Linen Set/hmgoepprod (1).jpg',
                'https://huuvuongassert.blob.core.windows.net/photo/Kidd/2-piece Linen Set/hmgoepprod (2).webp',
                'https://huuvuongassert.blob.core.windows.net/photo/Kidd/2-piece Linen Set/hmgoepprod.jpg',
                'https://huuvuongassert.blob.core.windows.net/photo/Kidd/Cotton%20Romper/hmgoepprod%20(1).jpg',
                'https://huuvuongassert.blob.core.windows.net/photo/Kidd/Cotton Romper/hmgoepprod (1).webp'
              ],
              product_quantities: null,
              avr_rate: 0
            },
            {
              id: '643e58b4197d9220d9792d0a',
              name: 'Loose Fit Tailored trousers',
              tags: ['HOT'],
              types: ['trousers'],
              brand: 'H&M',
              discount_amount: 0,
              discount_percent: 0,
              gender: 'MEN',
              price: 1000000,
              description:
                "The Loose Fit Tailored trousers from H&M are loose-fit trousers in woven fabric with a zip fly and button, side pockets, welt back pockets and straight legs with creases. They are made of polyester 65%, viscose 31%, elastane 4% shell and polyester 80%, cotton 20% pocket lining 1. The model is 182cm/6'0.",
              photos: null,
              product_quantities: null,
              avr_rate: 0
            },
            {
              id: '643e598a197d9220d9792d0b',
              name: 'Denim Overshirt',
              tags: ['HOT'],
              types: ['Overshirt'],
              brand: 'Mango',
              discount_amount: 100000,
              discount_percent: 0,
              gender: 'MEN',
              price: 1200000,
              description:
                "This loungewear-inspired piece is shaped for an oversized fit and can be worn as a shirt or jacket. It's crafted from organic denim blended with hemp for comfort and has a rounded silhouette that's enhanced by the dropped shoulders, side slits and back box pleat. Wear it with jeans in a similar wash",
              photos: null,
              product_quantities: null,
              avr_rate: 0
            },
            {
              id: '643e5a4f197d9220d9792d0c',
              name: 'Striped Button-Up Shirt',
              tags: ['HOT', 'SALE'],
              types: ['shirts'],
              brand: 'Banana Republic',
              discount_amount: 360000,
              discount_percent: 0.2,
              gender: 'MEN',
              price: 1800000,
              description: 'A classic button-up shirt with a stylish striped pattern.',
              photos: null,
              product_quantities: null,
              avr_rate: 0
            },
            {
              id: '624a372c92144c353db4d4d7',
              name: 'Cotton Eyelet Dress',
              tags: ['HOT', 'NEW'],
              types: ['dresses'],
              brand: 'J.Crew',
              discount_amount: 160000,
              discount_percent: 0.1,
              gender: 'WOMEN',
              price: 1600000,
              description:
                'This gorgeous cotton eyelet dress is perfect for any summer occasion. The delicate eyelet fabric is breathable and lightweight, while the flattering A-line shape and fitted bodice make this dress both comfortable and stylish. The dress features a concealed back zip and falls just below the knee. Pair with sandals and a hat for a casual daytime look, or dress it up with heels and statement jewelry for a formal event.',
              photos: null,
              product_quantities: null,
              avr_rate: 0
            },
            {
              id: '624a372c92144c353db4d4d8',
              name: 'Cashmere Cable-Knit Sweater',
              tags: ['SALE'],
              types: ['sweaters'],
              brand: 'Vince',
              discount_amount: 435000,
              discount_percent: 0.15,
              gender: 'MEN',
              price: 2900000,
              description:
                "This luxurious cashmere sweater is the perfect addition to any man's wardrobe. The classic cable-knit pattern adds a touch of texture, while the soft cashmere fabric keeps you warm and cozy. The sweater features a crewneck and ribbed cuffs and hem, and is available in a range of colors. Dress it up with tailored pants and dress shoes, or keep it casual with jeans and sneakers.",
              photos: null,
              product_quantities: null,
              avr_rate: 0
            },
            {
              id: '624a372c92144c353db4d4d4',
              name: 'Cashmere Hoodie',
              tags: ['HOT', 'NEW'],
              types: ['sweaters'],
              brand: 'Nordstrom',
              discount_amount: 350000,
              discount_percent: 0.1,
              gender: 'WOMEN',
              price: 3500000,
              description: 'A luxury cashmere hoodie that is both comfortable and stylish.',
              photos: null,
              product_quantities: null,
              avr_rate: 0
            },
            {
              id: '624a372c92144c353db4d4d6',
              name: 'Wool Peacoat',
              tags: ['SALE'],
              types: ['jackets'],
              brand: 'J.Crew',
              discount_amount: 330000,
              discount_percent: 0.15,
              gender: 'MEN',
              price: 2200000,
              description: 'A warm and stylish wool peacoat that is perfect for colder weather.',
              photos: null,
              product_quantities: null,
              avr_rate: 0
            },
            {
              id: '643e4f2e197d9220d9792d07',
              name: "Men's Wool-Blend Coat",
              tags: ['HOT', 'NEW', 'SALE'],
              types: ['coat'],
              brand: 'H&M',
              discount_amount: 100000,
              discount_percent: 0.3,
              gender: 'MEN',
              price: 1050000,
              description: 'this product use for test purpose',
              photos: null,
              product_quantities: null,
              avr_rate: 0
            },
            {
              id: '624a372c92144c353db4d4dd',
              name: 'Smart Home Speaker',
              tags: ['HOT', 'SALE'],
              types: ['dress'],
              brand: 'Amazon',
              discount_amount: 15000,
              discount_percent: 0.15,
              gender: '',
              price: 100000,
              description:
                'This smart home speaker is the perfect addition to any home. With Amazon Alexa built in, you can control your music, ask for the weather or news, and even control your smart home devices with your voice. The speaker features premium sound quality and a compact design that fits in any room. It connects to your home Wi-Fi network and can be easily set up using the Alexa app.',
              photos: null,
              product_quantities: null,
              avr_rate: 0
            },
            {
              id: '643e6495197d9220d9792d16',
              name: 'Linen Set',
              tags: ['HOT', 'SALE'],
              types: ['sweaters'],
              brand: 'H&M',
              discount_amount: 535000,
              discount_percent: 0.15,
              gender: 'KID',
              price: 2900000,
              description:
                'Aenean sed adipiscing diam donec adipiscing tristique. Bibendum enim facilisis gravida neque convallis a cras semper. Nunc vel risus commodo viverra maecenas accumsan. Praesent elementum facilisis leo vel fringilla est ullamcorper. Quis hendrerit dolor magna eget est lorem. Gravida neque convallis a cras semper auctor neque vitae. Condimentum lacinia quis vel eros donec ac odio. Vitae suscipit tellus mauris a diam.',
              photos: null,
              product_quantities: null,
              avr_rate: 0
            },
            {
              id: '643e65e1197d9220d9792d17',
              name: 'Cotton Romper',
              tags: ['HOT', 'SALE'],
              types: ['dress'],
              brand: 'Uniqlo',
              discount_amount: 0,
              discount_percent: 0.1,
              gender: 'KID',
              price: 900000,
              description:
                'Aenean sed adipiscing diam donec adipiscing tristique. Bibendum enim facilisis gravida neque convallis a cras semper. Nunc vel risus commodo viverra maecenas accumsan. Praesent elementum facilisis leo vel fringilla est ullamcorper. Quis hendrerit dolor magna eget est lorem. Gravida neque convallis a cras semper auctor neque vitae. Condimentum lacinia quis vel eros donec ac odio. Vitae suscipit tellus mauris a diam.',
              photos: null,
              product_quantities: null,
              avr_rate: 0
            },
            {
              id: '643e6669197d9220d9792d18',
              name: 'Patterned Swim Shorts',
              tags: ['NEW', 'SALE'],
              types: ['shorts'],
              brand: 'Uniqlo',
              discount_amount: 0,
              discount_percent: 0,
              gender: 'KID',
              price: 550000,
              description:
                'Make a splash with these stylish swim shorts, featuring a colorful pattern of tropical leaves and flowers. These shorts are made from quick-drying fabric that is soft and comfortable to wear. They have an elasticated waistband with a drawstring for a secure fit, and two side pockets for your essentials. Whether you’re lounging by the pool or hitting the beach, these shorts will keep you cool and confident. Pair them with a plain tee or a matching shirt for a fun summer look.',
              photos: [
                'https://huuvuongassert.blob.core.windows.net/photo/Kidd/Patterned Swim Shorts/hmgoepprod (1).jpg'
              ],
              product_quantities: null,
              avr_rate: 0
            },
            {
              id: '643e66fb197d9220d9792d19',
              name: 'Printed cotton T-shirt',
              tags: [],
              types: ['t-shirt'],
              brand: 'Uniqlo',
              discount_amount: 0,
              discount_percent: 0.15,
              gender: 'KID',
              price: 650000,
              description:
                'Add some personality to your wardrobe with this printed cotton T-shirt, featuring a quirky graphic of a cat wearing sunglasses. This T-shirt is made from 100% cotton that is soft, breathable and durable. It has a classic crew neck and short sleeves for a casual and comfortable fit. Whether you’re relaxing at home or hanging out with friends, this T-shirt will show off your sense of humor and style. Pair it with jeans or shorts for an easy and fun outfit.',
              photos: [
                'https://huuvuongassert.blob.core.windows.net/photo/Kidd/Printed%20cotton%20T-shirt/hmgoepprod%20(2).webp',
                'https://huuvuongassert.blob.core.windows.net/photo/Kidd/Printed cotton T-shirt/hmgoepprod (3).webp',
                'https://huuvuongassert.blob.core.windows.net/photo/Kidd/Printed%20cotton%20T-shirt/hmgoepprod%20(5).webp',
                'https://huuvuongassert.blob.core.windows.net/photo/Kidd/Printed%20cotton%20T-shirt/hmgoepprod%20(8).webp',
                'https://huuvuongassert.blob.core.windows.net/photo/Kidd/Printed%20cotton%20T-shirt/hmgoepprod%20(9).webp'
              ],
              product_quantities: null,
              avr_rate: 0
            },
            {
              id: '643e6825f54464222809bbe8',
              name: 'Printed Sweatshirt',
              tags: ['SALE'],
              types: ['t-shirt'],
              brand: 'Zara',
              discount_amount: 0,
              discount_percent: 0.15,
              gender: 'KID',
              price: 1650000,
              description:
                'Condimentum mattis pellentesque id nibh tortor id aliquet lectus. Id donec ultrices tincidunt arcu non sodales neque sodales. Suspendisse interdum consectetur libero id faucibus nisl. Dui ut ornare lectus sit amet est placerat in egestas. Proin nibh nisl condimentum id venenatis a condimentum vitae sapien.',
              photos: [
                'https://huuvuongassert.blob.core.windows.net/photo/Kidd/Printed%20Sweatshirt/hmgoepprod%20(2).webp',
                'https://huuvuongassert.blob.core.windows.net/photo/Kidd/Printed%20Sweatshirt/hmgoepprod%20(10).webp',
                'https://huuvuongassert.blob.core.windows.net/photo/Kidd/Printed%20Sweatshirt/hmgoepprod%20(5).webp'
              ],
              product_quantities: null,
              avr_rate: 0
            },
            {
              id: '643e6857f54464222809bbe9',
              name: 'Printed T-shirt',
              tags: ['SALE', 'HOT'],
              types: ['t-shirt'],
              brand: 'Zara',
              discount_amount: 0,
              discount_percent: 0.3,
              gender: 'KID',
              price: 1650000,
              description:
                'Condimentum mattis pellentesque id nibh tortor id aliquet lectus. Id donec ultrices tincidunt arcu non sodales neque sodales. Suspendisse interdum consectetur libero id faucibus nisl. Dui ut ornare lectus sit amet est placerat in egestas. Proin nibh nisl condimentum id venenatis a condimentum vitae sapien.',
              photos: [
                'https://huuvuongassert.blob.core.windows.net/photo/Kidd/Printed%20T-shirt/hmgoepprod%20(7).webp',
                'https://huuvuongassert.blob.core.windows.net/photo/Kidd/Printed%20T-shirt/hmgoepprod%20(6).webp'
              ],
              product_quantities: null,
              avr_rate: 0
            },
            {
              id: '643e687af54464222809bbea',
              name: 'Ribbed Cotton Jersey Top',
              tags: ['SALE', 'NEW'],
              types: ['jacket'],
              brand: 'Zara',
              discount_amount: 0,
              discount_percent: 0.5,
              gender: 'KID',
              price: 650000,
              description:
                'This ribbed cotton jersey top is a versatile and flattering piece that can be worn on its own or layered under a jacket or cardigan. The top is made from 100% cotton that is soft, stretchy and breathable. It has a scoop neck and long sleeves for a cozy and feminine look. The ribbed texture adds some interest and dimension to the simple design. You can choose from a range of colors to suit your mood and style. This top is a must-have for any season and occasion.',
              photos: [
                'https://huuvuongassert.blob.core.windows.net/photo/Kidd/Ribbed%20Cotton%20Jersey%20Top/hmgoepprod%20(1).webp',
                'https://huuvuongassert.blob.core.windows.net/photo/Kidd/Ribbed%20Cotton%20Jersey%20Top/hmgoepprod%20(4).webp'
              ],
              product_quantities: null,
              avr_rate: 0
            },
            {
              id: '643e6938f54464222809bbec',
              name: 'Water-resistant Softshell Jacket',
              tags: [],
              types: ['jacket'],
              brand: 'Mango',
              discount_amount: 0,
              discount_percent: 0,
              gender: 'KID',
              price: 950000,
              description:
                'Stay warm and dry in any weather with this water-resistant softshell jacket, featuring a windproof and breathable fabric that is flexible and comfortable. This jacket has a stand-up collar and a zip front with a chin guard for extra protection. It also has two zippered side pockets and one chest pocket for your essentials. The cuffs and hem are adjustable with Velcro tabs for a custom fit. This jacket is ideal for outdoor activities such as hiking, biking or skiing. You can choose from a variety of colors and sizes to suit your preference.',
              photos: [
                'https://huuvuongassert.blob.core.windows.net/photo/Kidd/Water-resistant%20Softshell%20Jacket/hmgoepprod%20(2).webp',
                'https://huuvuongassert.blob.core.windows.net/photo/Kidd/Water-resistant%20Softshell%20Jacket/hmgoepprod%20(1).webp',
                'https://huuvuongassert.blob.core.windows.net/photo/Kidd/Water-resistant%20Softshell%20Jacket/hmgoepprod.webp'
              ],
              product_quantities: null,
              avr_rate: 0
            },
            {
              id: '643e6989f54464222809bbed',
              name: 'Wide-leg Cargo Pants',
              tags: ['SALE'],
              types: ['pants'],
              brand: 'Mango',
              discount_amount: 0,
              discount_percent: 0.6,
              gender: 'KID',
              price: 1250000,
              description:
                'These wide-leg cargo pants are a trendy and practical choice for any casual occasion. They are made from a durable and lightweight cotton blend that is easy to wash and wear. They have a high-rise waist with a button and zip fly, and belt loops for optional styling. They also have two side pockets, two back pockets and two cargo pockets with flap closures for extra storage. The wide-leg silhouette creates a relaxed and flattering fit that can be paired with sneakers or boots. These pants are available in different colors and sizes to suit your taste.',
              photos: [
                'https://huuvuongassert.blob.core.windows.net/photo/Kidd/Wide-leg%20Cargo%20Pants/hmgoepprod%20(3).webp',
                'https://huuvuongassert.blob.core.windows.net/photo/Kidd/Wide-leg%20Cargo%20Pants/hmgoepprod%20(2).webp'
              ],
              product_quantities: null,
              avr_rate: 0
            }
          ],
          total: 19,
          length: 19,
          status: 'success'
        }
      })
    }, 500)
  )
}
