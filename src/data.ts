import { FuelPrice, ServiceItem, GalleryItem, Testimonial, NewsArticle, Branch } from './types';

export const INITIAL_FUEL_PRICES: FuelPrice[] = [
  {
    id: 'petrol',
    name: 'Petrol (Premium Gasoline)',
    price: 5200,
    currency: 'UGX',
    unit: 'Litre',
    trend: 'stable',
    lastUpdated: 'Today'
  },
  {
    id: 'diesel',
    name: 'Diesel (Low Sulphur)',
    price: 4900,
    currency: 'UGX',
    unit: 'Litre',
    trend: 'down',
    lastUpdated: 'Today'
  },
  {
    id: 'lubricant_premium',
    name: 'Engine Oil (SAE 20W-50 - 4L)',
    price: 75000,
    currency: 'UGX',
    unit: 'Jerrycan',
    trend: 'up',
    lastUpdated: '2 days ago'
  },
  {
    id: 'kerosene',
    name: 'Kerosene (Household)',
    price: 4100,
    currency: 'UGX',
    unit: 'Litre',
    trend: 'stable',
    lastUpdated: '1 week ago'
  }
];

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'fuel-retail',
    title: 'Fuel Retail Services',
    category: 'fuel-retail',
    shortDescription: 'Premium quality Petrol and Diesel dispensed through state-of-the-art volumetric pumps with 100% accuracy.',
    fullDescription: 'At Olayo Petroleum, we believe in maximizing your mileage. Our high-grade Petrol and Diesel are sourced cleanly, meeting rigorous international and Uganda National Bureau of Standards (UNBS) requirements. Backed by 24-hour service, professional forecourt assistants, and electronic payments, we offer Tororo drivers an unparalleled fueling experience.',
    icon: 'Fuel',
    image: 'https://images.unsplash.com/photo-1527018601619-a508a2be00cd?auto=format&fit=crop&q=80&w=600',
    benefits: ['Accurate electronic dispensing', '24-hour forecourt service', 'UNBS-certified fuel purity', 'Excellent loyalty & fleet cards']
  },
  {
    id: 'fuel-dist',
    title: 'Fuel Distribution Services',
    category: 'fuel-distribution',
    shortDescription: 'Reliable, bulk fuel deliveries for logistics fleets, factories, construction sites, and agricultural projects.',
    fullDescription: 'Keep your business moving. Olayo Petroleum is a premier diesel and petrol supplier for commercial accounts across Eastern Uganda. We service construction equipment on-site, provide commercial generators with scheduled diesel replenishments, and supply schools, NGOs, and transport fleets on flexible credit policies.',
    icon: 'Truck',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=600',
    benefits: ['Bulk fuel logistics & delivery', 'Flexible contract terms', 'Emergency 24/7 delivery options', 'Highly competitive wholesale pricing']
  },
  {
    id: 'petroleum-logistics',
    title: 'Regional Logistics & Haulage',
    category: 'logistics',
    shortDescription: 'Safe, regional transport operations across the East African corridor using a modern fleet of tanker trucks.',
    fullDescription: 'Leveraging Tororo’s strategic location as a gateway to East Africa, we run a sophisticated logistics division. Our modern, high-capacity tanker trucks are fully tracked via GPS and operated by senior drivers trained in strict Defensive Driving and hazardous material handling (HAZMAT) procedures.',
    icon: 'Navigation',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600',
    benefits: ['GPS tracking (Real-time tracking)', 'HAZMAT-compliant drivers', 'Regional cross-border transport', 'Zero-spill safety record']
  },
  {
    id: 'garage',
    title: 'Service Bay & Garage Services',
    category: 'service-bay',
    shortDescription: 'Professional vehicle maintenance, computer diagnostics, fluid flushing, and suspension repairs.',
    fullDescription: 'Our modern garage is equipped with computerized diagnostics and staffed by highly trained mechanical engineers. We handle engine tune-ups, filter and spark plug changes, brake fluid replenishments, and complex suspension repairs for sedans, SUVs, trucks, and multi-vehicle corporate fleets.',
    icon: 'Wrench',
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=600',
    benefits: ['Advanced vehicle diagnostics', 'Experienced automotive mechanics', 'Quick fluid & oil change bay', 'Corporate fleet service packages']
  },
  {
    id: 'wash-bay',
    title: 'Extreme Sparkle Washing Bay',
    category: 'washing-bay',
    shortDescription: 'High-pressure foam washing, chassis cleaning, interior detailing, and heavy-duty truck washing.',
    fullDescription: 'Restore that showroom look. Our washing bay uses industrial-grade high pressure sprayers and wax-infused premium vehicle shampoos. We offer quick exterior washes, thorough interior steam cleaning, full under-chassis mud removal (vital for muddy highways), and designated extra-large truck washer sections.',
    icon: 'Droplets',
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&q=80&w=600',
    benefits: ['High-pressure deep foam clean', 'Undercarriage & chassis washing', 'Detailing and leather rejuvenation', 'Truck & heavy utility cleaning']
  },
  {
    id: 'supermarket',
    title: '24/7 Oasis Convenience Store',
    category: 'convenience',
    shortDescription: 'Stop by for cold beverages, fresh bakery treats, heavy snacks, groceries, and travel emergency goods.',
    fullDescription: 'Refresh and recharge at the Olayo Oasis. Stocked with premium groceries, hot coffee, chilled sodas, on-the-go snacks, hygiene essentials, power banks, and car accessories (wiper blades, fuses, air fresheners). It is your perfect travel partner designed to ease long journeys through Tororo.',
    icon: 'ShoppingBag',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=600',
    benefits: ['Open 24 hours a day, 7 days a week', 'In-store hot bakery & coffee station', 'Automotive emergency supplies', 'Secure, well-lit parking']
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Modern Petroleum Forecourt at Night',
    category: 'station',
    imageUrl: 'https://images.unsplash.com/photo-1527018601619-a508a2be00cd?auto=format&fit=crop&q=80&w=800',
    description: 'Our beautifully lit fuel station at Mile One, Tororo, open 24 hours daily with round-the-clock armed security.'
  },
  {
    id: 'g2',
    title: 'High-Accuracy Fuel Pumps',
    category: 'station',
    imageUrl: 'https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80&w=800',
    description: 'Calibrated electronic volumetric dispensing pumps for petrol and diesel retail operations.'
  },
  {
    id: 'g3',
    title: 'High Capacity Tanker Fleet',
    category: 'tankers',
    imageUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800',
    description: 'Our certified logistics trucks ready for long-distance bulk fuel delivery across the East African border.'
  },
  {
    id: 'g4',
    title: 'Scheduled Commercial Delivery',
    category: 'operations',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    description: 'Providing seamless fueling operations to standard construction fleets and factory generators.'
  },
  {
    id: 'g5',
    title: 'Professional Service Bay',
    category: 'garage',
    imageUrl: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=800',
    description: 'Skilled Olayo mechanics carrying out precision computer-aided vehicle diagnostics and oil changes.'
  },
  {
    id: 'g6',
    title: 'Premium Hand Wash detailing',
    category: 'washing',
    imageUrl: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&q=80&w=800',
    description: 'State-of-the-art pressure washing of client vehicles using non-abrasive high foam soap.'
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Ronald Mukasa',
    role: 'Operations Director',
    company: 'Tororo Logistics & Freight Ltd',
    content: "Olayo Petroleum is our exclusive diesel partner. Their bulk distribution has never failed us, and the fuel quality guarantees that our haulage assets face zero engine blockages on long distance regional deliveries.",
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 't2',
    name: 'Amina Nakato',
    role: 'Procurement Specialist',
    company: 'Eastern Uganda Construction Co.',
    content: "Their diesel distribution program on construction sites in Tororo is highly disciplined. Even in severe weather, the Olayo tanker is on site right on schedule. Highly recommended corporate fuel solution.",
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 't3',
    name: 'Christopher Okello',
    role: 'Daily Commuter & Fleet Operator',
    company: 'Tororo Taxicab Association',
    content: "Clean, consistent fuel retail, and a professional crew. I also regularly service my taxis in their garage and get a spotless deep wash. Olayo is an asset to Tororo's transport network.",
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150'
  }
];

export const INITIAL_NEWS: NewsArticle[] = [
  {
    id: 'n1',
    title: 'Olayo Petroleum Expands Regional Logistics Fleet',
    excerpt: 'To cover the rising demand for premium diesel and bulk cargo energy across Eastern Uganda, we have launched four additional high-capacity tankers.',
    content: 'Olayo Petroleum is delighted to announce a significant enhancement to our supply operations. In alignment with our commitment to absolute reliability and energy security, we have added four new state-of-the-art DAF tankers to our regional fleet. Each unit features direct GPS telemetry, precise volumetric metering, and advanced safety control modules in line with Ugandan and regional safety frameworks. This ensures faster response times, higher dispatch guarantees, and absolute security for our corporate logistics partners.',
    date: 'June 10, 2026',
    category: 'Company Expansion',
    readTime: '3 min read',
    imageUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'n2',
    title: 'Commitment to Zero Spill Safety Standards',
    excerpt: 'Olayo Petroleum launches its annual safety compliance program, reinforcing safe container transport and forecourt protocols.',
    content: 'Safety is not just a regulatory checklist at Olayo Petroleum; it is a life-affirming corporate culture. This week, we launched our annual Forecourt safety & spill control exercises. Led by senior certified safety engineers, our entire crew completed intensive real-world simulations on fast fuel cutoffs, environmental containment, and emergency response. We are incredibly proud to report that our regional hauling operations maintain a perfect 100% zero-spill record over the last three years.',
    date: 'May 24, 2026',
    category: 'Safety & Quality',
    readTime: '4 min read',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800'
  }
];

export const INITIAL_BRANCHES: Branch[] = [
  {
    id: 'tororo',
    name: 'Tororo Highway Station (Flagship)',
    location: 'Busia Road, Tororo, Uganda',
    coordinates: '0.6865° N, 34.1798° E',
    plusCode: 'M5JH+Q3C, Tororo, Uganda',
    strategicContext: 'Situated on the primary Tororo–Busia highway, a high-traffic logistics corridor connecting landlocked Uganda to the Kenyan border. Extreme commuter load.',
    powerBackup: 'Heavy-duty 150kVA diesel backup generator with true-online double conversion UPS supporting forecourt computers.',
    capacities: [
      { product: 'Bulk Diesel', capacity: '60,000 Litres' },
      { product: 'Premium Petrol', capacity: '45,000 Litres' },
      { product: 'Lubricants (Sealed Packs)', capacity: '10,005 Litres' }
    ],
    localStack: {
      payments: 'Handheld Android POS terminals (Pesapal) integrating MTN Mobile Money and Airtel Money APIs directly over local registers.',
      forecourt: 'Electronic volumetric fuel dispensers with high-frequency telemetry counters linked to local administrative PC nodes.',
      connectivity: 'Primary 4G LTE cellular data backed by secondary point-to-point microwave link for centralized price updates.'
    }
  },
  {
    id: 'malaba',
    name: 'Malaba Border Gateway',
    location: 'Malaba Bypass Corridor, Tororo District, Uganda',
    coordinates: '0.6385° N, 34.2755° E',
    plusCode: 'HXY7+98J, Malaba, Uganda',
    strategicContext: 'Direct turn-off leading to the East Africa customs clearing terminal. Focused majorly on heavy logistics trucking companies and cross-border fleets.',
    powerBackup: 'Continuous diesel generator with localized 5000VA stabilizer racks ensuring safe voltage control across tank sensor equipment.',
    capacities: [
      { product: 'Wholesale Diesel', capacity: '120,000 Litres' },
      { product: 'Premium Petrol', capacity: '30,000 Litres' },
      { product: 'Industrial Grease', capacity: '5,000 Litres' }
    ],
    localStack: {
      payments: 'B2B commercial billing accounts, corporate RFID tag identification on truck windshields, and online cellular banking.',
      forecourt: 'Semi-automated highflow dual-nozzle dispensers optimized for bulk vehicle fuel fills in minimum loading times.',
      connectivity: 'High-gain external Yagi antenna array targeting local telco transmitters for reliable 4G carrier aggregation.'
    }
  },
  {
    id: 'busia',
    name: 'Busia Transit Hub',
    location: 'Jinja-Busia Road, Busia, Uganda',
    coordinates: '0.4682° N, 34.0911° E',
    plusCode: 'FX3C+P6W, Busia, Uganda',
    strategicContext: 'High-frequency transient refuelling node for agricultural haulers and long-distance cargo fleets traveling southward through the East African highway split.',
    powerBackup: 'Automatic Transfer Switch (ATS) coupled with clean auxiliary battery system for 24-hour non-stop billing uptime.',
    capacities: [
      { product: 'Bulk Diesel', capacity: '50,050 Litres' },
      { product: 'Premium Petrol', capacity: '40,005 Litres' },
      { product: 'LPG Propane Cylinder Store', capacity: '150 Units' }
    ],
    localStack: {
      payments: 'NFC contactless cards, handheld mobile payment modules, and fast MTN MoMo Pay merchant shortcuts.',
      forecourt: 'Standard calibrated electronic dispensers with centralized remote shutoff safeties connected to forecourt controllers.',
      connectivity: 'Primary cellular data transceiver utilizing offline-transaction-queuing database logic during deep cellular drops.'
    }
  },
  {
    id: 'kampala',
    name: 'Kampala Logistics Office & Depot',
    location: 'Nakawa Industrial Area, Kampala, Uganda',
    coordinates: '0.3162° N, 32.5821° E',
    plusCode: '8H7V+G4F, Kampala, Uganda',
    strategicContext: 'Executive Command Center and dispatch depot regulating bulk B2B agreements, corporate billing ledgers, and centralized regional supply logistics.',
    powerBackup: 'Stable metropolitan power pool with automatic 80kVA standby backup generator setup protecting localized server farm.',
    capacities: [
      { product: 'Dispatch Diesel (Transit)', capacity: '180,000 Litres' },
      { product: 'Aviation & Industry Lubes', capacity: '20,000 Litres' }
    ],
    localStack: {
      payments: 'Direct wholesale EFT transmissions, corporate bank integration modules, B2B digital escrow and invoicing APIs.',
      forecourt: 'Digital logistics coordination depot. Bulk tanker loading telemetry tracked in real-time through centralized SCADA screens.',
      connectivity: 'Fiber Optic broadband feed backing up safe VPN connections directly to every border-corridor branch.'
    }
  }
];
