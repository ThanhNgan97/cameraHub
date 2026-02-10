const prisma = require('./src/config/prisma');

const products = [
    { name: "Sony Alpha A7 IV Body (Máy ảnh)", category: "Mirrorless", price: 58990000, image: "https://bizweb.dktcdn.net/100/507/659/products/sony-alpha-a7m4-13-500x500-1.jpg?v=1708060110230" },
    { name: "SONY ALPHA A6400 +16-50MM F3.5-5.6 OSS (Máy ảnh)", category: "Mirrorless", price: 20990000, image: "https://bizweb.dktcdn.net/thumb/1024x1024/100/297/199/products/284693910-5173412966076136-1371159811766084390-n.jpg?v=1654750509123" },
    { name: "Sony Alpha A6700 Body (Máy ảnh)", category: "Mirrorless", price: 35990000, image: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?q=80&w=500&auto=format&fit=crop" },
    { name: "Canon EOS R5 Body (Máy ảnh)", category: "Mirrorless", price: 89990000, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=500&auto=format&fit=crop" },
    { name: "Canon EOS R6 Mark II (Máy ảnh)", category: "Mirrorless", price: 59990000, image: "https://binhminhdigital.com/storedata/images/product/may-anh-canon-eos-r6-mark-ii-lens-24105mm-f4-l.jpg" },
    { name: "Canon EOS R10 Kit (Máy ảnh)", category: "Mirrorless", price: 17990000, image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=500&auto=format&fit=crop" },
    { name: "Nikon Z8 Body (Máy ảnh)", category: "Mirrorless", price: 94990000, image: "https://product.hstatic.net/1000234350/product/1683706042_img_1990357_b306ad71996b4c66906f7c1e871fbe3c_1024x1024.jpg" },
    { name: "Nikon Z6 II Body (Máy ảnh)", category: "Mirrorless", price: 40990000, image: "https://www.mpb.com/media-service/e5dfc942-fa61-4f2c-9543-6729bca645eb" },
    { name: "Nikon Z50 Kit (Máy ảnh)", category: "Mirrorless", price: 18990000, image: "https://mayanh9x.com/image/cache/catalog/san-pham/nikon/nikon-z50-ii-kit-16-50mm-chinh-hang/nikon-z50-ii-chinh-hang-gia-tot-500x500.jpg" },
    { name: "Fujifilm X-T5 Body (Máy ảnh)", category: "Mirrorless", price: 44990000, image: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?q=80&w=500&auto=format&fit=crop" },
    { name: "Fujifilm X-S20 (Máy ảnh)", category: "Mirrorless", price: 28990000, image: "https://cdn.vjshop.vn/may-anh/mirrorless/fujifilm/fujifilm-x-s20/body/fujifilm-x-s20.jpg" },
    { name: "Fujifilm X100V (Máy ảnh Compact)", category: "Compact", price: 39990000, image: "https://bizweb.dktcdn.net/thumb/grande/100/297/199/files/403853073-762448085897098-6756280309024142811-n.jpg?v=1701678237253" },
    { name: "Panasonic Lumix S5 II (Máy ảnh)", category: "Mirrorless", price: 44990000, image: "https://cdn.vjshop.vn/may-anh/mirrorless/panasonic/panasonic-lumix-s5-ii/anh-nd/panasonic-lumix-s5-ii-10.jpg" },
    { name: "OM System OM-1 (Máy ảnh)", category: "Mirrorless", price: 39990000, image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=500&auto=format&fit=crop" },
    { name: "Sony ZV-E10 (Máy ảnh Vlog)", category: "Mirrorless", price: 16990000, image: "https://mayanh9x.com/image/catalog/san-pham/mayanh-sony/sony-zv-e10-chinh-hang-sony-vietnam/sony-alpha-zv-e10-kit-16-50mm.jpg" },
    { name: "Canon EOS R50 (Máy ảnh)", category: "Mirrorless", price: 15990000, image: "https://cdn.vjshop.vn/may-anh/mirrorless/canon/canon-eos-r50/white-18-45/canon-eos-r50-white-lens-18-45mm-lens-4-500x500.jpg" },
    { name: "Nikon Z fc (Máy ảnh)", category: "Mirrorless", price: 22990000, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=500&auto=format&fit=crop" },
    { name: "Fujifilm X-T30 II (Máy ảnh)", category: "Mirrorless", price: 19990000, image: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?q=80&w=500&auto=format&fit=crop" },
    { name: "Sony FE 24-70mm f/2.8 GM II (Ống kính)", category: "Lens", price: 49990000, image: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=500&q=80" },
    { name: "Sony FE 70-200mm f/2.8 GM OSS II (Ống kính)", category: "Lens", price: 75990000, image: "https://binhminhdigital.com/storedata/images/product/ongkinh/sony/ong-kinh-sony-fe-70-200mm-f2-8-gm-oss-ii.jpg" },
    { name: "Sony FE 50mm f/1.8 (Ống kính)", category: "Lens", price: 7990000, image: "https://bizweb.dktcdn.net/100/107/650/products/sony-fe-50mm-1-8-lens-review-side-angle.jpg?v=1513855286137" },
    { name: "Canon RF 50mm f/1.8 STM (Ống kính)", category: "Lens", price: 7490000, image: "https://vn.canon/media/image/2020/11/03/057b4fd6aae14236a14658facaf46ad2_RF50mm+f1.8+STM+Slant.png" },
    { name: "Canon RF 24-105mm f/4-7.1 IS STM (Ống kính)", category: "Lens", price: 15990000, image: "https://mayanhshipmy.com/wp-content/uploads/2024/11/1581548522_IMG_1315920-1024x755.jpg" },
    { name: "Nikon Z 24-70mm f/4 S (Ống kính)", category: "Lens", price: 21990000, image: "https://imaging.nikon.com/imaging/lineup/lens/z-mount/z_24-70mmf4s/img/product_01_05.jpg" },
    { name: "Nikon Z 85mm f/1.8 S (Ống kính)", category: "Lens", price: 21990000, image: "https://mayanh24h.com/upload/assets/thumb/2024/0627/ar/z-35mm-1-4-1.jpg" },
    { name: "Fujifilm XF 35mm f/1.4 R (Ống kính)", category: "Lens", price: 10990000, image: "https://fujifilmshop.vn/wp-content/uploads/2024/09/Ong-kinh-Fujifilm-XF-35mm-f1.4-R-1.jpg.webp" },
    { name: "Fujifilm XF 56mm f/1.2 R (Ống kính)", category: "Lens", price: 24990000, image: "https://mayanhhoangto.com/wp-content/uploads/2018/12/56-1.2-R-3.jpg" },
    { name: "Panasonic Lumix S PRO 50mm f/1.4 (Ống kính)", category: "Lens", price: 30990000, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80" }
];

async function seed() {
    console.log('Seeding products...');

    // Check if shop exists, if not create one
    let shop = await prisma.shops.findFirst();
    if (!shop) {
        let user = await prisma.users.findFirst({ where: { role: 'shop' } });
        if (!user) {
            user = await prisma.users.create({
                data: {
                    full_name: 'Test Shop Owner',
                    email: 'shop@example.com',
                    password_hash: 'hash',
                    role: 'shop',
                    status: 'active'
                }
            });
        }

        shop = await prisma.shops.create({
            data: {
                owner_id: user.id,
                shop_name: 'CameraHub Official',
                description: 'Official test shop',
                status: 'approved',
                rating: 5.0
            }
        });
    }

    // Clear existing products
    await prisma.product_images.deleteMany();
    await prisma.products.deleteMany();

    for (const p of products) {
        let brand = 'Other';
        if (p.name.toLowerCase().includes('sony')) brand = 'Sony';
        if (p.name.toLowerCase().includes('canon')) brand = 'Canon';
        if (p.name.toLowerCase().includes('nikon')) brand = 'Nikon';
        if (p.name.toLowerCase().includes('fujifilm')) brand = 'Fujifilm';
        if (p.name.toLowerCase().includes('panasonic') || p.name.includes('Lumix')) brand = 'Panasonic';
        if (p.name.toLowerCase().includes('om system') || p.name.includes('Olympus')) brand = 'OM System';

        const product = await prisma.products.create({
            data: {
                shop_id: shop.id,
                name: p.name,
                brand: brand,
                category: p.category,
                price: p.price,
                status: 'active',
                stock: 10,
                rating: 5.0,
                reviews_count: 0
            }
        });

        if (p.image) {
            await prisma.product_images.create({
                data: {
                    product_id: product.id,
                    image_url: p.image,
                    is_main: true
                }
            });
        }
    }

    console.log(`Seeded ${products.length} products.`);
}

seed()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
