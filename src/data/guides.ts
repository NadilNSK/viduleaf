export type Guide = {
  slug: string; title: string; description: string; asset: string;
  readTime: string; category: string;
  sections: { title: string; text: string }[];
  source: { label: string; url: string };
};

export const guides: Guide[] = [
  {
    slug: 'find-your-light', title: 'A little light goes a long way.',
    description: 'Get to know the light in your home before choosing a plant.',
    asset: 'rubber', readTime: '2 min read', category: 'The essentials',
    sections: [
      { title: 'Start with the space', text: 'Look at your chosen spot at different times of day. Light changes through the day and through the year, and a corner farther from a window can be much darker than the room feels to us.' },
      { title: 'Match the plant to the conditions', text: 'Different plants need different amounts of light. Check the guidance for your particular plant, then choose a spot that suits it. Bright indirect light means useful daylight without strong sun falling directly on the leaves.' },
      { title: 'Watch the strongest sunshine', text: 'Strong direct sun can damage plants that prefer gentler light. A sheer curtain can soften it. Give the plant enough room to grow and observe how its leaves respond to the position you choose.' },
    ],
    source: { label: 'RHS — Choosing the best houseplants', url: 'https://www.rhs.org.uk/plants/types/houseplants/choosing-the-best' },
  },
  {
    slug: 'water-with-care', title: 'Water with care, not a calendar.',
    description: 'A simple habit that starts with getting to know your plant.',
    asset: 'peace', readTime: '2 min read', category: 'Everyday care',
    sections: [
      { title: 'Every plant has its own rhythm', text: 'Some plants prefer consistently moist compost; others need it to dry somewhat between waterings. Start with the care instructions for your plant instead of giving every pot the same weekly routine.' },
      { title: 'Notice the growing conditions', text: 'Light, temperature, potting mix and the plant itself affect water needs. Check the compost and compare it with your plant’s requirements before watering. A sunny position or freely draining mix can change how quickly a pot dries.' },
      { title: 'Keep the basics comfortable', text: 'Room-temperature water suits many houseplants. Keep plants away from heating vents, air-conditioning outlets and strong draughts, and continue watching them as the conditions in your home change.' },
    ],
    source: { label: 'University of Connecticut — Growing houseplants', url: 'https://homegarden.cahnr.uconn.edu/factsheets/growing-houseplants/' },
  },
  {
    slug: 'welcome-a-new-plant', title: 'Make your new plant feel at home.',
    description: 'A thoughtful start for your newest leafy companion.',
    asset: 'monstera', readTime: '2 min read', category: 'Getting started',
    sections: [
      { title: 'Take a closer look', text: 'Before settling a plant into your home, inspect the foliage, including the undersides of leaves, for insects and unusual damage. Learn the plant’s name so you can look up its particular needs.' },
      { title: 'Give it a gentle journey', text: 'Keep a plant out of a hot parked car and protect its leaves from intense sun during transport. Move it carefully and choose a home position with appropriate light, temperature and humidity.' },
      { title: 'Allow time to adjust', text: 'A new plant needs to adjust to its surroundings. Make changes in light gradually rather than suddenly moving it between very different conditions. Pay attention to the plant and its potting mix before watering, and let excess water drain away.' },
    ],
    source: { label: 'University of Arkansas Extension — Houseplant care and maintenance', url: 'https://www.uaex.uada.edu/yard-garden/home-landscape/house-plants/care-and-maintenance.aspx' },
  },
];
