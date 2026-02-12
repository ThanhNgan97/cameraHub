/**
 * @typedef {Object} ProductKit
 * @property {string} name
 * @property {number} price
 */

/**
 * @typedef {Object} ProductSpecs
 * @property {string} sensor
 * @property {string} processor
 * @property {string} iso
 * @property {string} af
 * @property {string} video
 * @property {string} screen
 * @property {string} viewfinder
 * @property {string} battery
 */

/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} name
 * @property {'sony'|'canon'|'nikon'|'fujifilm'|'panasonic'|'olympus'|'sigma'|'benro'} brand
 * @property {'camera'|'lens'|'accessory'} category
 * @property {string} image
 * @property {string[]} [images]
 * @property {number} price
 * @property {number|null} [originalPrice]
 * @property {string|null} [sale]
 * @property {boolean} soldOut
 * @property {'new'|'used'} condition
 * @property {number} rating
 * @property {number} reviews
 * @property {number} [resolution]
 * @property {string} color
 * @property {ProductKit} [kit]
 * @property {ProductSpecs} [specs]
 */

// Product Data
export const MOCK_PRODUCTS = [
  // ==================== SONY CAMERAS ====================
  {
    id: 1,
    name: "Sony Alpha A7 IV Body",
    brand: "sony",
    category: "camera",
    image: "https://bizweb.dktcdn.net/100/507/659/products/sony-alpha-a7m4-13-500x500-1.jpg?v=1708060110230",
    images: [
      "https://bizweb.dktcdn.net/100/507/659/products/sony-alpha-a7m4-13-500x500-1.jpg?v=1708060110230",
      "https://bizweb.dktcdn.net/100/507/659/products/sony-alpha-a7m4-13-500x500-1.jpg?v=1708060110230"
    ],
    rating: 4.9,
    reviews: 210,
    price: 58990000,
    originalPrice: 62990000,
    sale: "-6%",
    soldOut: false,
    condition: "new",
    resolution: 33,
    color: "black",
    kit: {
      name: "Kit 28-70mm OSS",
      price: 64990000
    },
    specs: {
      sensor: "Full-frame Exmor R CMOS 33.0 MP",
      processor: "BIONZ XR + AI Processing Unit",
      iso: "100 - 51200 (Mở rộng 50 - 204800)",
      af: "759 điểm lấy nét theo pha, Real-time Eye AF",
      video: "4K 60p 10-bit 4:2:2, S-Cinetone",
      screen: "LCD 3.0 inch xoay lật cảm ứng (1.03 triệu điểm ảnh)",
      viewfinder: "EVF OLED 3.69 triệu điểm ảnh, phóng đại 0.78x",
      battery: "NP-FZ100 (Chụp khoảng 580 tấm)"
    }
  },
  {
    id: 2,
    name: "Sony Alpha A7R V Body",
    brand: "sony",
    category: "camera",
    image: "https://tinhte.vn/store/2016/08/3854364_2623230484.jpg",
    images: [
      "https://tinhte.vn/store/2016/08/3854364_2623230484.jpg"
    ],
    rating: 5.0,
    reviews: 45,
    price: 85990000,
    originalPrice: null,
    sale: null,
    soldOut: false,
    condition: "new",
    resolution: 61,
    color: "black",
    specs: {
      sensor: "Full-frame Exmor R CMOS 61.0 MP",
      processor: "BIONZ XR",
      iso: "100 - 32000 (Mở rộng 50 - 102400)",
      af: "693 điểm lấy nét, AI-based subject recognition",
      video: "8K 24p, 4K 60p 10-bit 4:2:2",
      screen: "LCD 3.2 inch xoay lật 4 trục cảm ứng (2.1 triệu điểm ảnh)",
      viewfinder: "EVF OLED 9.44 triệu điểm ảnh, phóng đại 0.90x",
      battery: "NP-FZ100 (Chụp khoảng 530 tấm)"
    }
  },
  {
    id: 3,
    name: "Sony Alpha A6700 Body",
    brand: "sony",
    category: "camera",
    image: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?q=80&w=500&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?q=80&w=500&auto=format&fit=crop"
    ],
    rating: 4.8,
    reviews: 95,
    price: 35990000,
    originalPrice: null,
    sale: null,
    soldOut: false,
    condition: "new",
    resolution: 26.0,
    color: "black",
    specs: {
      sensor: "APS-C Exmor R CMOS 26.0 MP",
      processor: "BIONZ XR",
      iso: "100 - 32000 (Mở rộng 50 - 102400)",
      af: "759 điểm lấy nét, AI processing unit",
      video: "4K 60p 10-bit 4:2:2, S-Log3",
      screen: "LCD 3.0 inch xoay lật cảm ứng (1.03 triệu điểm ảnh)",
      viewfinder: "EVF OLED 2.36 triệu điểm ảnh",
      battery: "NP-FZ100 (Chụp khoảng 550 tấm)"
    }
  },
  {
    id: 4,
    name: "Sony Alpha A6400 Kit 16-50mm",
    brand: "sony",
    category: "camera",
    image: "https://bizweb.dktcdn.net/thumb/1024x1024/100/297/199/products/284693910-5173412966076136-1371159811766084390-n.jpg?v=1654750509123",
    images: [
      "https://bizweb.dktcdn.net/thumb/1024x1024/100/297/199/products/284693910-5173412966076136-1371159811766084390-n.jpg?v=1654750509123"
    ],
    rating: 4.7,
    reviews: 180,
    price: 20990000,
    originalPrice: null,
    sale: null,
    soldOut: false,
    condition: "new",
    resolution: 24.2,
    color: "white",
    specs: {
      sensor: "APS-C Exmor CMOS 24.2 MP",
      processor: "BIONZ X",
      iso: "100 - 32000 (Mở rộng 50 - 102400)",
      af: "425 điểm lấy nét, Real-time Eye AF",
      video: "4K 30p, Full HD 120p",
      screen: "LCD 3.0 inch lật 180° cảm ứng (921.600 điểm ảnh)",
      viewfinder: "EVF OLED 2.36 triệu điểm ảnh",
      battery: "NP-FW50 (Chụp khoảng 410 tấm)"
    }
  },
  {
    id: 5,
    name: "Sony ZV-E10 Body",
    brand: "sony",
    category: "camera",
    image: "https://mayanh9x.com/image/catalog/san-pham/mayanh-sony/sony-zv-e10-chinh-hang-sony-vietnam/sony-alpha-zv-e10-kit-16-50mm.jpg",
    images: [
      "https://mayanh9x.com/image/catalog/san-pham/mayanh-sony/sony-zv-e10-chinh-hang-sony-vietnam/sony-alpha-zv-e10-kit-16-50mm.jpg"
    ],
    rating: 4.6,
    reviews: 230,
    price: 16990000,
    originalPrice: null,
    sale: null,
    soldOut: false,
    condition: "new",
    resolution: 24.2,
    color: "black",
    specs: {
      sensor: "APS-C Exmor CMOS 24.2 MP",
      processor: "BIONZ X",
      iso: "100 - 32000 (Mở rộng 50 - 51200)",
      af: "425 điểm lấy nét theo pha, Real-time Eye AF",
      video: "4K 30p, FHD 120p",
      screen: "LCD 3.0 inch xoay lật cảm ứng (921.600 điểm ảnh)",
      viewfinder: "Không có",
      battery: "NP-FW50 (Chụp khoảng 440 tấm)"
    }
  },
  {
    id: 6,
    name: "Sony Alpha A7S III Body",
    brand: "sony",
    category: "camera",
    image: "https://file.hstatic.net/200000782117/file/2_2c79544bfef94492af1c5126258b7e9a.jpg",
    images: [
      "https://file.hstatic.net/200000782117/file/2_2c79544bfef94492af1c5126258b7e9a.jpg",
      "https://binhminhdigital.com/StoreData/images/Product/may-anh-sony-alpha-a7s-iii-body.jpg"
    ],
    rating: 4.9,
    reviews: 150,
    price: 79990000,
    originalPrice: 82990000,
    sale: "-3%",
    soldOut: false,
    condition: "new",
    resolution: 12.1,
    color: "black",
    kit: {
      name: "Kit FE 24-70mm f/2.8 GM",
      price: 115000000
    },
    specs: {
      sensor: "Full-frame Exmor R CMOS 12.1 MP",
      processor: "BIONZ XR",
      iso: "80 - 102400 (Mở rộng 40 - 409600)",
      af: "759 điểm lấy nét theo pha, Real-time Eye AF",
      video: "4K 120p, 16-bit RAW output, S-Log3",
      screen: "LCD 3.0 inch xoay lật cảm ứng (1.44 triệu điểm ảnh)",
      viewfinder: "EVF OLED 9.44 triệu điểm ảnh, phóng đại 0.90x",
      battery: "NP-FZ100 (Chụp khoảng 600 tấm)"
    }
  },

  // ==================== CANON CAMERAS ====================
  {
    id: 7,
    name: "Canon EOS R5 Body",
    brand: "canon",
    category: "camera",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=500&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=500&auto=format&fit=crop"
    ],
    rating: 4.9,
    reviews: 320,
    price: 89990000,
    originalPrice: 95000000,
    sale: "-5%",
    soldOut: false,
    condition: "new",
    resolution: 45,
    color: "black",
    kit: {
      name: "Kit RF 24-105mm f/4L",
      price: 105000000
    },
    specs: {
      sensor: "Full-frame CMOS 45.0 MP",
      processor: "DIGIC X",
      iso: "100 - 51200 (Mở rộng 50 - 102400)",
      af: "Dual Pixel CMOS AF II, 1053 điểm lấy nét",
      video: "8K 30p, 4K 120p 10-bit 4:2:2, Canon Log",
      screen: "LCD 3.2 inch xoay lật cảm ứng (2.1 triệu điểm ảnh)",
      viewfinder: "EVF OLED 5.76 triệu điểm ảnh, phóng đại 0.76x",
      battery: "LP-E6NH (Chụp khoảng 490 tấm)"
    }
  },
  {
    id: 8,
    name: "Canon EOS R6 Mark II Body",
    brand: "canon",
    category: "camera",
    image: "https://binhminhdigital.com/storedata/images/product/may-anh-canon-eos-r6-mark-ii-lens-24105mm-f4-l.jpg",
    images: [
      "https://binhminhdigital.com/storedata/images/product/may-anh-canon-eos-r6-mark-ii-lens-24105mm-f4-l.jpg"
    ],
    rating: 4.8,
    reviews: 160,
    price: 59990000,
    originalPrice: null,
    sale: null,
    soldOut: false,
    condition: "new",
    resolution: 24.2,
    color: "black",
    specs: {
      sensor: "Full-frame CMOS 24.2 MP",
      processor: "DIGIC X",
      iso: "100 - 102400 (Mở rộng 50 - 204800)",
      af: "Dual Pixel CMOS AF II, 1053 điểm lấy nét",
      video: "4K 60p 10-bit, 6K RAW output",
      screen: "LCD 3.0 inch xoay lật cảm ứng (1.62 triệu điểm ảnh)",
      viewfinder: "EVF OLED 3.69 triệu điểm ảnh",
      battery: "LP-E6NH (Chụp khoảng 580 tấm)"
    }
  },
  {
    id: 9,
    name: "Canon EOS 5D Mark IV Body",
    brand: "canon",
    category: "camera",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Canon_EOS_5D_Mark_IV_and_EF_11-24mm_F4L_USM.jpg",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/b/bf/Canon_EOS_5D_Mark_IV_and_EF_11-24mm_F4L_USM.jpg"
    ],
    rating: 4.8,
    reviews: 205,
    price: 28500000,
    originalPrice: 45000000,
    sale: "-37%",
    soldOut: false,
    condition: "used",
    resolution: 30.4,
    color: "black",
    specs: {
      sensor: "Full-frame CMOS 30.4 MP",
      processor: "DIGIC 6+",
      iso: "100 - 32000 (Mở rộng 50 - 102400)",
      af: "61 điểm lấy nét, 41 điểm chéo",
      video: "4K 30p, Full HD 60p",
      screen: "LCD 3.2 inch cảm ứng (1.62 triệu điểm ảnh)",
      viewfinder: "Optical pentaprism, phóng đại 0.71x",
      battery: "LP-E6N (Chụp khoảng 900 tấm)"
    }
  },
  {
    id: 10,
    name: "Canon EOS R10 Kit 18-45mm",
    brand: "canon",
    category: "camera",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=500&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=500&auto=format&fit=crop"
    ],
    rating: 4.6,
    reviews: 110,
    price: 17990000,
    originalPrice: null,
    sale: null,
    soldOut: false,
    condition: "new",
    resolution: 24.2,
    color: "black",
    specs: {
      sensor: "APS-C CMOS 24.2 MP",
      processor: "DIGIC X",
      iso: "100 - 32000 (Mở rộng 51200)",
      af: "Dual Pixel CMOS AF II, 651 điểm",
      video: "4K 60p không crop, Full HD 120p",
      screen: "LCD 3.0 inch xoay lật cảm ứng (1.04 triệu điểm ảnh)",
      viewfinder: "EVF OLED 2.36 triệu điểm ảnh",
      battery: "LP-E17 (Chụp khoảng 450 tấm)"
    }
  },
  {
    id: 11,
    name: "Canon EOS R50 Body",
    brand: "canon",
    category: "camera",
    image: "https://cdn.vjshop.vn/may-anh/mirrorless/canon/canon-eos-r50/white-18-45/canon-eos-r50-white-lens-18-45mm-lens-4-500x500.jpg",
    images: [
      "https://cdn.vjshop.vn/may-anh/mirrorless/canon/canon-eos-r50/white-18-45/canon-eos-r50-white-lens-18-45mm-lens-4-500x500.jpg"
    ],
    rating: 4.5,
    reviews: 60,
    price: 15990000,
    originalPrice: null,
    sale: null,
    soldOut: false,
    condition: "new",
    resolution: 24.2,
    color: "white",
    specs: {
      sensor: "APS-C CMOS 24.2 MP",
      processor: "DIGIC X",
      iso: "100 - 32000 (Mở rộng 51200)",
      af: "Dual Pixel CMOS AF II",
      video: "4K 30p, Full HD 120p",
      screen: "LCD 3.0 inch xoay lật cảm ứng (1.62 triệu điểm ảnh)",
      viewfinder: "EVF OLED 2.36 triệu điểm ảnh",
      battery: "LP-E17 (Chụp khoảng 370 tấm)"
    }
  },

  // ==================== NIKON CAMERAS ====================
  {
    id: 12,
    name: "Nikon Z8 Body",
    brand: "nikon",
    category: "camera",
    image: "https://product.hstatic.net/1000234350/product/1683706042_img_1990357_b306ad71996b4c66906f7c1e871fbe3c_1024x1024.jpg",
    images: [
      "https://product.hstatic.net/1000234350/product/1683706042_img_1990357_b306ad71996b4c66906f7c1e871fbe3c_1024x1024.jpg"
    ],
    rating: 4.9,
    reviews: 88,
    price: 94990000,
    originalPrice: null,
    sale: null,
    soldOut: false,
    condition: "new",
    resolution: 45.7,
    color: "black",
    kit: {
      name: "Kit Z 24-120mm f/4 S",
      price: 109990000
    },
    specs: {
      sensor: "Stacked CMOS 45.7 MP",
      processor: "EXPEED 7",
      iso: "64 - 25600 (Mở rộng 32 - 102400)",
      af: "493 điểm lấy nét, 3D Tracking, Subject Detection",
      video: "8K 60p N-RAW, 4K 120p, 12-bit RAW video",
      screen: "LCD 3.2 inch lật 4 trục cảm ứng (2.1 triệu điểm ảnh)",
      viewfinder: "EVF OLED 3.69 triệu điểm ảnh, sáng 3000 nits, không blackout",
      battery: "EN-EL15c (Chụp khoảng 340 tấm)"
    }
  },
  {
    id: 13,
    name: "Nikon Z6 II Body",
    brand: "nikon",
    category: "camera",
    image: "https://www.mpb.com/media-service/e5dfc942-fa61-4f2c-9543-6729bca645eb",
    images: [
      "https://www.mpb.com/media-service/e5dfc942-fa61-4f2c-9543-6729bca645eb"
    ],
    rating: 4.7,
    reviews: 140,
    price: 40990000,
    originalPrice: null,
    sale: null,
    soldOut: true,
    condition: "used",
    resolution: 24.5,
    color: "black",
    specs: {
      sensor: "Full-frame CMOS 24.5 MP",
      processor: "Dual EXPEED 6",
      iso: "100 - 51200 (Mở rộng 50 - 204800)",
      af: "273 điểm lấy nét, Eye-Detection AF",
      video: "4K 60p, 10-bit N-Log",
      screen: "LCD 3.2 inch lật cảm ứng (2.1 triệu điểm ảnh)",
      viewfinder: "EVF OLED 3.69 triệu điểm ảnh",
      battery: "EN-EL15c (Chụp khoảng 410 tấm)"
    }
  },
  {
    id: 14,
    name: "Nikon Z50 Kit 16-50mm",
    brand: "nikon",
    category: "camera",
    image: "https://mayanh9x.com/image/cache/catalog/san-pham/nikon/nikon-z50-ii-kit-16-50mm-chinh-hang/nikon-z50-ii-chinh-hang-gia-tot-500x500.jpg",
    images: [
      "https://mayanh9x.com/image/cache/catalog/san-pham/nikon/nikon-z50-ii-kit-16-50mm-chinh-hang/nikon-z50-ii-chinh-hang-gia-tot-500x500.jpg"
    ],
    rating: 4.6,
    reviews: 90,
    price: 18990000,
    originalPrice: null,
    sale: null,
    soldOut: false,
    condition: "new",
    resolution: 20.9,
    color: "black",
    specs: {
      sensor: "APS-C CMOS 20.9 MP",
      processor: "EXPEED 6",
      iso: "100 - 51200 (Mở rộng 204800)",
      af: "209 điểm lấy nét, Eye-AF",
      video: "4K 30p, Full HD 120p",
      screen: "LCD 3.2 inch lật cảm ứng (1.04 triệu điểm ảnh)",
      viewfinder: "EVF OLED 2.36 triệu điểm ảnh",
      battery: "EN-EL25 (Chụp khoảng 320 tấm)"
    }
  },
  {
    id: 15,
    name: "Nikon Z fc Body",
    brand: "nikon",
    category: "camera",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=500&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=500&auto=format&fit=crop"
    ],
    rating: 4.6,
    reviews: 82,
    price: 22990000,
    originalPrice: null,
    sale: null,
    soldOut: false,
    condition: "new",
    resolution: 20.9,
    color: "silver",
    specs: {
      sensor: "APS-C CMOS 20.9 MP",
      processor: "EXPEED 6",
      iso: "100 - 51200",
      af: "209 điểm lấy nét, Eye-AF",
      video: "4K 30p, Full HD 120p",
      screen: "LCD 3.0 inch lật cảm ứng (1.04 triệu điểm ảnh)",
      viewfinder: "EVF OLED 2.36 triệu điểm ảnh",
      battery: "EN-EL25 (Chụp khoảng 300 tấm)"
    }
  },

  // ==================== FUJIFILM CAMERAS ====================
  {
    id: 16,
    name: "Fujifilm X-T5 Body",
    brand: "fujifilm",
    category: "camera",
    image: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?q=80&w=500&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1516724562728-afc824a36e84?q=80&w=500&auto=format&fit=crop"
    ],
    rating: 4.8,
    reviews: 120,
    price: 44990000,
    originalPrice: null,
    sale: null,
    soldOut: false,
    condition: "new",
    resolution: 40.2,
    color: "black",
    specs: {
      sensor: "APS-C X-Trans CMOS 5 HR 40.2 MP",
      processor: "X-Processor 5",
      iso: "125 - 12800 (Mở rộng 64 - 51200)",
      af: "Intelligent Hybrid AF, Subject Detection AI",
      video: "6.2K 30p, 4K 60p 10-bit 4:2:2",
      screen: "LCD 3.0 inch xoay lật 3 chiều (1.84 triệu điểm ảnh)",
      viewfinder: "EVF OLED 3.69 triệu điểm ảnh, phóng đại 0.80x",
      battery: "NP-W235 (Chụp khoảng 580 tấm)"
    }
  },
  {
    id: 17,
    name: "Fujifilm X-S20 Body",
    brand: "fujifilm",
    category: "camera",
    image: "https://cdn.vjshop.vn/may-anh/mirrorless/fujifilm/fujifilm-x-s20/body/fujifilm-x-s20.jpg",
    images: [
      "https://cdn.vjshop.vn/may-anh/mirrorless/fujifilm/fujifilm-x-s20/body/fujifilm-x-s20.jpg"
    ],
    rating: 4.7,
    reviews: 75,
    price: 28990000,
    originalPrice: null,
    sale: null,
    soldOut: false,
    condition: "new",
    resolution: 26.1,
    color: "black",
    specs: {
      sensor: "APS-C X-Trans CMOS 4 26.1 MP",
      processor: "X-Processor 5",
      iso: "160 - 12800 (Mở rộng 80 - 51200)",
      af: "Intelligent Hybrid AF với AI",
      video: "6.2K 30p, 4K 60p 10-bit",
      screen: "LCD 3.0 inch xoay lật cảm ứng (1.84 triệu điểm ảnh)",
      viewfinder: "EVF OLED 2.36 triệu điểm ảnh",
      battery: "NP-W235 (Chụp khoảng 750 tấm)"
    }
  },
  {
    id: 18,
    name: "Fujifilm X100V",
    brand: "fujifilm",
    category: "camera",
    image: "https://bizweb.dktcdn.net/thumb/grande/100/297/199/files/403853073-762448085897098-6756280309024142811-n.jpg?v=1701678237253",
    images: [
      "https://bizweb.dktcdn.net/thumb/grande/100/297/199/files/403853073-762448085897098-6756280309024142811-n.jpg?v=1701678237253"
    ],
    rating: 5.0,
    reviews: 500,
    price: 39990000,
    originalPrice: null,
    sale: null,
    soldOut: true,
    condition: "new",
    resolution: 26.1,
    color: "black",
    specs: {
      sensor: "APS-C X-Trans CMOS 4 26.1 MP",
      processor: "X-Processor 4",
      iso: "160 - 12800 (Mở rộng 80 - 51200)",
      af: "Intelligent Hybrid AF",
      video: "4K 30p, Full HD 120p",
      screen: "LCD 3.0 inch lật 2 chiều cảm ứng (1.62 triệu điểm ảnh)",
      viewfinder: "Hybrid OVF/EVF, 3.69 triệu điểm ảnh",
      battery: "NP-W126S (Chụp khoảng 420 tấm)"
    }
  },
  {
    id: 19,
    name: "Fujifilm X-T30 II Body",
    brand: "fujifilm",
    category: "camera",
    image: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?q=80&w=500&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1516724562728-afc824a36e84?q=80&w=500&auto=format&fit=crop"
    ],
    rating: 4.6,
    reviews: 90,
    price: 19990000,
    originalPrice: null,
    sale: null,
    soldOut: false,
    condition: "new",
    resolution: 26.1,
    color: "black",
    specs: {
      sensor: "APS-C X-Trans CMOS 4 26.1 MP",
      processor: "X-Processor 4",
      iso: "160 - 12800 (Mở rộng 80 - 51200)",
      af: "425 điểm lấy nét, Face/Eye Detection",
      video: "4K 30p, Full HD 240p",
      screen: "LCD 3.0 inch lật cảm ứng (1.04 triệu điểm ảnh)",
      viewfinder: "EVF OLED 2.36 triệu điểm ảnh",
      battery: "NP-W126S (Chụp khoảng 380 tấm)"
    }
  },

  // ==================== OTHER CAMERAS ====================
  {
    id: 20,
    name: "Panasonic Lumix S5 II Body",
    brand: "panasonic",
    category: "camera",
    image: "https://cdn.vjshop.vn/may-anh/mirrorless/panasonic/panasonic-lumix-s5-ii/anh-nd/panasonic-lumix-s5-ii-10.jpg",
    images: [
      "https://cdn.vjshop.vn/may-anh/mirrorless/panasonic/panasonic-lumix-s5-ii/anh-nd/panasonic-lumix-s5-ii-10.jpg"
    ],
    rating: 4.7,
    reviews: 65,
    price: 44990000,
    originalPrice: null,
    sale: null,
    soldOut: false,
    condition: "new",
    resolution: 24.2,
    color: "black",
    specs: {
      sensor: "Full-frame CMOS 24.2 MP",
      processor: "Venus Engine",
      iso: "100 - 51200 (Mở rộng 50 - 204800)",
      af: "Phase Detection AF, 779 điểm",
      video: "6K 30p, 4K 60p 10-bit 4:2:2",
      screen: "LCD 3.0 inch xoay lật cảm ứng (1.84 triệu điểm ảnh)",
      viewfinder: "EVF OLED 2.36 triệu điểm ảnh",
      battery: "DMW-BLK22 (Chụp khoảng 370 tấm)"
    }
  },
  {
    id: 21,
    name: "OM System OM-1 Body",
    brand: "olympus",
    category: "camera",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=500&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=500&auto=format&fit=crop"
    ],
    rating: 4.7,
    reviews: 54,
    price: 39990000,
    originalPrice: null,
    sale: null,
    soldOut: false,
    condition: "new",
    resolution: 20.4,
    color: "black",
    specs: {
      sensor: "Micro Four Thirds Stacked BSI CMOS 20.4 MP",
      processor: "TruePic X",
      iso: "200 - 25600 (Mở rộng 80 - 102400)",
      af: "1053 điểm, Cross-type Quad Pixel AF",
      video: "4K 60p, C4K 60p",
      screen: "LCD 3.0 inch xoay lật cảm ứng (1.62 triệu điểm ảnh)",
      viewfinder: "EVF OLED 5.76 triệu điểm ảnh, 120fps",
      battery: "BLX-1 (Chụp khoảng 520 tấm)"
    }
  },

  // ==================== SONY LENSES ====================
  {
    id: 22,
    name: "Sony FE 24-70mm f/2.8 GM II",
    brand: "sony",
    category: "lens",
    image: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=500&q=80"
    ],
    rating: 5.0,
    reviews: 42,
    price: 49990000,
    originalPrice: null,
    sale: null,
    soldOut: false,
    condition: "new",
    color: "black",
    specs: {
      mount: "Sony E-mount Full-frame",
      focalLength: "24-70mm",
      aperture: "f/2.8 (constant)",
      elements: "17 elements trong 14 nhóm",
      autofocus: "XD Linear Motor x4",
      stabilization: "Không có",
      filterSize: "82mm",
      dimensions: "88 x 119.5mm (Ø x L)",
      weight: "695g"
    }
  },
  {
    id: 23,
    name: "Sony FE 70-200mm f/2.8 GM OSS II",
    brand: "sony",
    category: "lens",
    image: "https://binhminhdigital.com/storedata/images/product/ongkinh/sony/ong-kinh-sony-fe-70-200mm-f2-8-gm-oss-ii.jpg",
    images: [
      "https://binhminhdigital.com/storedata/images/product/ongkinh/sony/ong-kinh-sony-fe-70-200mm-f2-8-gm-oss-ii.jpg"
    ],
    rating: 4.9,
    reviews: 30,
    price: 75990000,
    originalPrice: 79990000,
    sale: "-5%",
    soldOut: false,
    condition: "new",
    color: "white",
    specs: {
      mount: "Sony E-mount Full-frame",
      focalLength: "70-200mm",
      aperture: "f/2.8 (constant)",
      elements: "17 elements trong 14 nhóm",
      autofocus: "XD Linear Motor x4",
      stabilization: "Optical SteadyShot",
      filterSize: "77mm",
      dimensions: "88 x 200mm (Ø x L)",
      weight: "1045g"
    }
  },
  {
    id: 24,
    name: "Sony FE 50mm f/1.8",
    brand: "sony",
    category: "lens",
    image: "https://bizweb.dktcdn.net/100/107/650/products/sony-fe-50mm-1-8-lens-review-side-angle.jpg?v=1513855286137",
    images: [
      "https://bizweb.dktcdn.net/100/107/650/products/sony-fe-50mm-1-8-lens-review-side-angle.jpg?v=1513855286137"
    ],
    rating: 4.7,
    reviews: 110,
    price: 7990000,
    originalPrice: null,
    sale: null,
    soldOut: false,
    condition: "new",
    color: "black",
    specs: {
      mount: "Sony E-mount Full-frame",
      focalLength: "50mm",
      aperture: "f/1.8",
      elements: "6 elements trong 5 nhóm",
      autofocus: "DC Motor",
      stabilization: "Không có",
      filterSize: "49mm",
      dimensions: "68.6 x 59.5mm (Ø x L)",
      weight: "186g"
    }
  },

  // ==================== CANON LENSES ====================
  {
    id: 25,
    name: "Canon RF 50mm f/1.8 STM",
    brand: "canon",
    category: "lens",
    image: "https://vn.canon/media/image/2020/11/03/057b4fd6aae14236a14658facaf46ad2_RF50mm+f1.8+STM+Slant.png",
    images: [
      "https://vn.canon/media/image/2020/11/03/057b4fd6aae14236a14658facaf46ad2_RF50mm+f1.8+STM+Slant.png"
    ],
    rating: 4.6,
    reviews: 85,
    price: 7490000,
    originalPrice: null,
    sale: null,
    soldOut: false,
    condition: "new",
    color: "black",
    specs: {
      mount: "Canon RF mount Full-frame",
      focalLength: "50mm",
      aperture: "f/1.8",
      elements: "6 elements trong 5 nhóm",
      autofocus: "STM (Stepping Motor)",
      stabilization: "Không có",
      filterSize: "52mm",
      dimensions: "69.2 x 40.5mm (Ø x L)",
      weight: "160g"
    }
  },
  {
    id: 26,
    name: "Canon RF 24-105mm f/4-7.1 IS STM",
    brand: "canon",
    category: "lens",
    image: "https://mayanhshipmy.com/wp-content/uploads/2024/11/1581548522_IMG_1315920-1024x755.jpg",
    images: [
      "https://mayanhshipmy.com/wp-content/uploads/2024/11/1581548522_IMG_1315920-1024x755.jpg"
    ],
    rating: 4.5,
    reviews: 95,
    price: 15990000,
    originalPrice: null,
    sale: null,
    soldOut: false,
    condition: "new",
    color: "black",
    specs: {
      mount: "Canon RF mount Full-frame",
      focalLength: "24-105mm",
      aperture: "f/4-7.1 (variable)",
      elements: "13 elements trong 11 nhóm",
      autofocus: "STM (Stepping Motor)",
      stabilization: "Không có",
      filterSize: "67mm",
      dimensions: "76.6 x 88.8mm (Ø x L)",
      weight: "395g"
    }
  },

  // ==================== NIKON LENSES ====================
  {
    id: 27,
    name: "Nikon Z 24-70mm f/4 S",
    brand: "nikon",
    category: "lens",
    image: "https://imaging.nikon.com/imaging/lineup/lens/z-mount/z_24-70mmf4s/img/product_01_05.jpg",
    images: [
      "https://imaging.nikon.com/imaging/lineup/lens/z-mount/z_24-70mmf4s/img/product_01_05.jpg"
    ],
    rating: 4.7,
    reviews: 56,
    price: 21990000,
    originalPrice: null,
    sale: null,
    soldOut: false,
    condition: "new",
    color: "black",
    specs: {
      mount: "Nikon Z mount Full-frame",
      focalLength: "24-70mm",
      aperture: "f/4 (constant)",
      elements: "14 elements trong 11 nhóm",
      autofocus: "Stepping Motor",
      stabilization: "Không có",
      filterSize: "72mm",
      dimensions: "77.5 x 88.5mm (Ø x L)",
      weight: "500g"
    }
  },
  {
    id: 28,
    name: "Nikon Z 85mm f/1.8 S",
    brand: "nikon",
    category: "lens",
    image: "https://mayanh24h.com/upload/assets/thumb/2024/0627/ar/z-35mm-1-4-1.jpg",
    images: [
      "https://mayanh24h.com/upload/assets/thumb/2024/0627/ar/z-35mm-1-4-1.jpg"
    ],
    rating: 4.8,
    reviews: 65,
    price: 21990000,
    originalPrice: null,
    sale: null,
    soldOut: false,
    condition: "new",
    color: "black",
    specs: {
      mount: "Nikon Z mount Full-frame",
      focalLength: "85mm",
      aperture: "f/1.8",
      elements: "12 elements trong 8 nhóm",
      autofocus: "Stepping Motor",
      stabilization: "Không có",
      filterSize: "67mm",
      dimensions: "75 x 99mm (Ø x L)",
      weight: "470g"
    }
  },

  // ==================== FUJIFILM LENSES ====================
  {
    id: 29,
    name: "Fujifilm XF 35mm f/1.4 R",
    brand: "fujifilm",
    category: "lens",
    image: "https://fujifilmshop.vn/wp-content/uploads/2024/09/Ong-kinh-Fujifilm-XF-35mm-f1.4-R-1.jpg.webp",
    images: [
      "https://fujifilmshop.vn/wp-content/uploads/2024/09/Ong-kinh-Fujifilm-XF-35mm-f1.4-R-1.jpg.webp"
    ],
    rating: 4.9,
    reviews: 70,
    price: 10990000,
    originalPrice: null,
    sale: null,
    soldOut: false,
    condition: "new",
    color: "black",
    specs: {
      mount: "Fujifilm X-mount APS-C",
      focalLength: "35mm (tương đương 53mm full-frame)",
      aperture: "f/1.4",
      elements: "8 elements trong 6 nhóm",
      autofocus: "DC Motor",
      stabilization: "Không có",
      filterSize: "52mm",
      dimensions: "65 x 54.9mm (Ø x L)",
      weight: "187g"
    }
  },
  {
    id: 30,
    name: "Fujifilm XF 56mm f/1.2 R",
    brand: "fujifilm",
    category: "lens",
    image: "https://mayanhhoangto.com/wp-content/uploads/2018/12/56-1.2-R-3.jpg",
    images: [
      "https://mayanhhoangto.com/wp-content/uploads/2018/12/56-1.2-R-3.jpg"
    ],
    rating: 5.0,
    reviews: 34,
    price: 24990000,
    originalPrice: null,
    sale: null,
    soldOut: false,
    condition: "new",
    color: "black",
    specs: {
      mount: "Fujifilm X-mount APS-C",
      focalLength: "56mm (tương đương 85mm full-frame)",
      aperture: "f/1.2",
      elements: "11 elements trong 8 nhóm",
      autofocus: "DC Motor",
      stabilization: "Không có",
      filterSize: "62mm",
      dimensions: "73.2 x 69.7mm(Ø x L)",
      weight: "405g"
    }
  },

  // ==================== OTHER LENSES ====================
  {
    id: 31,
    name: "Sigma 35mm f/1.4 DG DN Art",
    brand: "sigma",
    category: "lens",
    image: "https://zshop.vn/images/thumbnails/1357/1000/detailed/97/1619511624_1636131.jpg",
    images: [
      "https://zshop.vn/images/thumbnails/1357/1000/detailed/97/1619511624_1636131.jpg"
    ],
    rating: 4.8,
    reviews: 45,
    price: 18990000,
    originalPrice: null,
    sale: null,
    soldOut: false,
    condition: "new",
    color: "black",
    specs: {
      mount: "Sony E-mount / L-mount Full-frame",
      focalLength: "35mm",
      aperture: "f/1.4",
      elements: "15 elements trong 11 nhóm",
      autofocus: "Stepping Motor",
      stabilization: "Không có",
      filterSize: "67mm",
      dimensions: "75.5 x 111.5mm (Ø x L)",
      weight: "640g"
    }
  },
  {
    id: 32,
    name: "Panasonic Lumix S PRO 50mm f/1.4",
    brand: "panasonic",
    category: "lens",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80"
    ],
    rating: 4.8,
    reviews: 40,
    price: 30990000,
    originalPrice: null,
    sale: null,
    soldOut: false,
    condition: "new",
    color: "black",
    specs: {
      mount: "Panasonic L-mount Full-frame",
      focalLength: "50mm",
      aperture: "f/1.4",
      elements: "13 elements trong 11 nhóm",
      autofocus: "Linear Motor",
      stabilization: "Không có",
      filterSize: "77mm",
      dimensions: "87.6 x 130mm (Ø x L)",
      weight: "955g"
    }
  },

  // ==================== ACCESSORIES ====================
  // {
  //   id: 33,
  //   name: "Benro Tripod System GoPlus",
  //   brand: "benro",
  //   category: "accessory",
  //   image: "https://bizweb.dktcdn.net/thumb/1024x1024/100/107/650/products/benro-systemgo-plus-fgo28a-tripod-w-fgo2-center-column-monopod-conversion-1447094054000-1196417.jpg",
  //   images: [
  //     "https://bizweb.dktcdn.net/thumb/1024x1024/100/107/650/products/benro-systemgo-plus-fgo28a-tripod-w-fgo2-center-column-monopod-conversion-1447094054000-1196417.jpg"
  //   ],
  //   rating: 4.9,
  //   reviews: 88,
  //   price: 3500000,
  //   originalPrice: null,
  //   sale: null,
  //   soldOut: false,
  //   condition: "new",
  //   color: "black"
  // }
];

// Helper functions for filtering
export const getProductsByCategory = (category) => {
  return MOCK_PRODUCTS.filter(product => product.category === category);
};

export const getProductsByBrand = (brand) => {
  return MOCK_PRODUCTS.filter(product => product.brand === brand);
};

export const getAvailableProducts = () => {
  return MOCK_PRODUCTS.filter(product => !product.soldOut);
};

export const getNewProducts = () => {
  return MOCK_PRODUCTS.filter(product => product.condition === 'new');
};

export const getProductsOnSale = () => {
  return MOCK_PRODUCTS.filter(product => product.sale !== null);
};