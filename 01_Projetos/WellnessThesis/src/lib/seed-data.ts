import dbConnect from './mongodb';
import User from '../models/User';
import Post from '../models/Post';

async function seed() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) throw new Error('MONGODB_URI is required');

    await dbConnect();

    // 1. Seed Admin
    const adminUser = await User.findOne({ username: process.env.ADMIN_USERNAME });
    if (!adminUser) {
      await User.create({
        username: process.env.ADMIN_USERNAME,
        password: process.env.ADMIN_PASSWORD,
        role: process.env.ADMIN_ROLE,
      });
      console.log('Seed: Admin user created');
    } else {
      adminUser.password = process.env.ADMIN_PASSWORD;
      await adminUser.save();
      console.log('Seed: Admin user password updated');
    }

    // 2. Seed High-Quality Posts (with Persuasive Copywriting)
    const existingPosts = await Post.countDocuments();
    if (existingPosts === 0) {
      await Post.create([
        {
          title: 'The "Metabolic Wall" After 35: Why Your Diet Stopped Working',
          slug: 'metabolic-wall-after-35',
          image_url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1200&q=80',
          content: `
            <p class="lead">For years, you've heard the same advice: "Eat less, move more." But if you're over 35, you've likely noticed something frustrating. The rules have changed.</p>
            
            <h2>The Science of Mitochondrial Decline</h2>
            <p>Recent studies in metabolic performance show that calorie counting is only half the battle. The real culprit? <strong>Mitochondrial efficiency.</strong> As we age, our "cellular power plants" lose their ability to convert stored fat into energy efficiently. This isn't just a physical change; it's a metabolic shift that locks your fat stores behind a wall of biological resistance.</p>
            
            <blockquote>"It's not about how much you eat, it's about how your cells handle the energy."</blockquote>
            
            <h2>The Fat Loss Plateau</h2>
            <p>When your mitochondria are sluggish, your body enters a conservative state. Instead of burning fat for fuel, it begins to store it more aggressively, even on a caloric deficit. This leads to the dreaded "plateau" where even intense workouts fail to yield results.</p>
            
            <h2>How to Re-Engage Your Metabolism</h2>
            <p>To break through the wall, you need to focus on mitochondrial health. This involves specific nutritional protocols, high-intensity interval training (HIIT), and most importantly, supporting your body's natural efficiency from within.</p>
          `,
          cta_link: 'https://abd91l3kwjq7poa7lf2kci6p2v.hop.clickbank.net', // Exemplo de link afiliado
          ad_slots: {
            top: '<!-- Google Ads Top placeholder -->',
            sidebar: '<!-- Google Ads Sidebar placeholder -->',
            in_feed: '<!-- Google Ads In-feed placeholder -->'
          }
        },
        {
            title: 'Top 5 Anti-Inflammatory Foods for Instant Bloat Relief',
            slug: 'top-5-anti-inflammatory-foods',
            image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80',
            content: `
              <p>Bloating isn't just uncomfortable; it's a sign of systemic inflammation. By incorporating these five science-backed foods, you can soothe your digestive tract and feel lighter in days.</p>
              <ul>
                <li><strong>Ginger:</strong> A powerful root that speeds up gastric emptying.</li>
                <li><strong>Turmeric:</strong> Contains curcumin, which inhibits inflammatory markers.</li>
                <li><strong>Wild Salmon:</strong> Rich in Omega-3 fatty acids.</li>
                <li><strong>Blueberries:</strong> Packed with anthocyanins.</li>
                <li><strong>Leafy Greens:</strong> High in magnesium and fiber.</li>
              </ul>
            `,
            cta_link: 'https://healththesis.com/supplement-guide',
            ad_slots: {
              top: '<!-- Google Ads Top placeholder -->',
              sidebar: '<!-- Google Ads Sidebar placeholder -->',
              in_feed: '<!-- Google Ads In-feed placeholder -->'
            }
          }
      ]);
      console.log('Seed: Initial high-quality posts created');
    }

  } catch (error) {
    console.error('Seed error:', error);
  } finally {
    process.exit(0);
  }
}

seed();
