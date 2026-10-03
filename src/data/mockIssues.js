export const INITIAL_ISSUES = [
  {
    id: "issue-1",
    ticketId: "#CIVIC-8492",
    title: "Deep Crater Pothole Damaging Car Suspensions",
    description: "Substantial pothole near the intersection of Elm Street and 4th Avenue. Multiple vehicles have suffered punctured tires and rim damage. It is over 8 inches deep and exposes broken asphalt aggregate.",
    category: "Infrastructure",
    urgency: "High",
    status: "In Progress",
    location: {
      lat: 40.7128,
      lng: -74.0060,
      address: "142 Elm St, Downtown West",
      neighborhood: "Downtown District",
      landmark: "Opposite Metro Supermarket"
    },
    mediaUrl: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=900&q=80",
    beforePhotoUrl: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=900&q=80",
    afterPhotoUrl: "",
    reportedAt: "2026-10-01T09:30:00Z",
    updatedAt: "2026-10-02T14:15:00Z",
    reporter: {
      name: "Marcus Vance",
      contact: "marcus.v@example.com",
      isAnonymous: false
    },
    upvotes: 47,
    hasUpvoted: false,
    department: "Department of Public Works",
    assignedTeam: {
      name: "Asphalt Rapid Response Crew #3",
      leadWorker: "Supervisor Dave Miller",
      contactNumber: "+1 (555) 438-9921"
    },
    eta: "Today by 4:00 PM",
    timeline: [
      {
        id: "t1-1",
        status: "Submitted",
        timestamp: "2026-10-01T09:30:00Z",
        title: "Issue Reported by Citizen",
        description: "Citizen logged initial report with photos and GPS pin.",
        actor: "Marcus Vance",
        role: "Citizen"
      },
      {
        id: "t1-2",
        status: "Under Review",
        timestamp: "2026-10-01T11:00:00Z",
        title: "Triage & AI Severity Verification",
        description: "AI flagged high hazard rating due to vehicular traffic volume. Triage officer approved inspection order.",
        actor: "Civic AI Dispatcher",
        role: "Municipal System"
      },
      {
        id: "t1-3",
        status: "Assigned",
        timestamp: "2026-10-02T08:30:00Z",
        title: "Work Order Dispatched",
        description: "Assigned to Asphalt Rapid Response Crew #3 with steam roller and cold-patch supply.",
        actor: "Central Ops Coordinator",
        role: "Department Head"
      },
      {
        id: "t1-4",
        status: "In Progress",
        timestamp: "2026-10-02T14:15:00Z",
        title: "Roadwork Commenced",
        description: "Traffic cones placed, milling machine grinding damaged perimeter.",
        actor: "Supervisor Dave Miller",
        role: "Field Team"
      }
    ],
    comments: [
      {
        id: "c1-1",
        author: "Sarah Lin",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
        timestamp: "2026-10-01T12:45:00Z",
        content: "Nearly ruined my wheel here yesterday! Thanks for reporting this, Marcus."
      },
      {
        id: "c1-2",
        author: "Municipal Works Dispatch",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
        timestamp: "2026-10-02T08:35:00Z",
        content: "Crew #3 is on schedule with hot-mix asphalt. Lane 1 will have minor diversion until 4 PM.",
        isOfficial: true
      }
    ],
    aiMetadata: {
      confidence: 96,
      detectedKeywords: ["pothole", "punctured tires", "suspensions", "broken asphalt", "crater"],
      reasoning: "High traffic street hazard detected. Priority elevated due to vehicular damage risk."
    }
  },
  {
    id: "issue-2",
    ticketId: "#CIVIC-8501",
    title: "Burst Water Main Flooding Residential Crossroads",
    description: "High-pressure clean water geyser bubbling up through sidewalk pavers. The water has flooded the entire pedestrian crossing and is leaking toward basement entryways.",
    category: "Water & Drainage",
    urgency: "Emergency",
    status: "Assigned",
    location: {
      lat: 40.7180,
      lng: -74.0010,
      address: "88 Grand Street & Mercer Way",
      neighborhood: "SoHo Commons",
      landmark: "Beside Community Library"
    },
    mediaUrl: "https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=900&q=80",
    beforePhotoUrl: "https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=900&q=80",
    afterPhotoUrl: "",
    reportedAt: "2026-10-02T06:10:00Z",
    updatedAt: "2026-10-02T07:05:00Z",
    reporter: {
      name: "Elena Rostova",
      contact: "elena.r@example.com",
      isAnonymous: false
    },
    upvotes: 68,
    hasUpvoted: true,
    department: "Water & Sewer Authority",
    assignedTeam: {
      name: "Emergency Hydraulics Unit A",
      leadWorker: "Chief Engineer Carlos Diaz",
      contactNumber: "+1 (555) 302-8819"
    },
    eta: "Emergency Team ETA: 25 mins",
    timeline: [
      {
        id: "t2-1",
        status: "Submitted",
        timestamp: "2026-10-02T06:10:00Z",
        title: "Emergency Water Alert Filed",
        description: "Reported flooding near residential basements.",
        actor: "Elena Rostova",
        role: "Citizen"
      },
      {
        id: "t2-2",
        status: "Under Review",
        timestamp: "2026-10-02T06:18:00Z",
        title: "Automated Emergency Escalation",
        description: "AI triggered code Crimson for structural flooding danger.",
        actor: "Civic AI Dispatcher",
        role: "Municipal System"
      },
      {
        id: "t2-3",
        status: "Assigned",
        timestamp: "2026-10-02T07:05:00Z",
        title: "Shut-Off Crew Dispatched",
        description: "Hydraulics Unit A dispatched with isolation valve blueprints.",
        actor: "Water Authority Central Control",
        role: "Department Head"
      }
    ],
    comments: [
      {
        id: "c2-1",
        author: "David Kim",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
        timestamp: "2026-10-02T06:30:00Z",
        content: "Water pressure in our building just dropped completely. Please hurry!"
      }
    ],
    aiMetadata: {
      confidence: 99,
      detectedKeywords: ["burst water main", "geyser", "flooding", "basement", "high-pressure"],
      reasoning: "Emergency water loss and flood threat to private property triggers immediate dispatch."
    }
  },
  {
    id: "issue-3",
    ticketId: "#CIVIC-8340",
    title: "Overflowing Commercial Trash Bins Attracting Rodents",
    description: "Sanitation bins behind the shopping alleyway have not been emptied in 5 days. Garbage bags are piled 5 feet high, spilling onto pedestrian walk and attracting strays and pests.",
    category: "Sanitation",
    urgency: "Medium",
    status: "Resolved",
    location: {
      lat: 40.7250,
      lng: -74.0090,
      address: "310 Washington Plaza",
      neighborhood: "Market District",
      landmark: "Behind Central Farmers Market"
    },
    mediaUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=900&q=80",
    beforePhotoUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=900&q=80",
    afterPhotoUrl: "https://images.unsplash.com/photo-1528323273322-d81458248d40?auto=format&fit=crop&w=900&q=80",
    reportedAt: "2026-09-28T14:00:00Z",
    updatedAt: "2026-09-29T16:30:00Z",
    reporter: {
      name: "Priya Patel",
      contact: "priya.p@example.com",
      isAnonymous: false
    },
    upvotes: 34,
    hasUpvoted: false,
    department: "Department of Sanitation",
    assignedTeam: {
      name: "Heavy Waste Compactor Squad 12",
      leadWorker: "Officer Ray Reynolds",
      contactNumber: "+1 (555) 778-1200"
    },
    eta: "Completed",
    timeline: [
      {
        id: "t3-1",
        status: "Submitted",
        timestamp: "2026-09-28T14:00:00Z",
        title: "Report Submitted",
        description: "Citizen reported overflow and health hazard.",
        actor: "Priya Patel",
        role: "Citizen"
      },
      {
        id: "t3-2",
        status: "Assigned",
        timestamp: "2026-09-29T08:00:00Z",
        title: "Sanitation Route Adjusted",
        description: "Scheduled for morning priority route pickup.",
        actor: "Sanitation Logistics",
        role: "Department Head"
      },
      {
        id: "t3-3",
        status: "In Progress",
        timestamp: "2026-09-29T14:15:00Z",
        title: "Cleanup Underway",
        description: "Compactor truck on site. Pressure wash sanitized area.",
        actor: "Officer Ray Reynolds",
        role: "Field Team"
      },
      {
        id: "t3-4",
        status: "Resolved",
        timestamp: "2026-09-29T16:30:00Z",
        title: "Site Cleared and Sanitized",
        description: "All waste hauled away. Replacement heavy-duty bins installed.",
        actor: "Officer Ray Reynolds",
        role: "Field Team"
      }
    ],
    comments: [
      {
        id: "c3-1",
        author: "Ray Reynolds (Sanitation Lead)",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
        timestamp: "2026-09-29T16:35:00Z",
        content: "Alley is fully cleared, pressure-washed, and equipped with lockable lid bins.",
        isOfficial: true
      }
    ],
    feedback: {
      rating: 5,
      feedbackText: "Super fast response! Alley is sparkling clean and smells fresh now.",
      isResolvedConfirmed: true,
      citizenName: "Priya Patel",
      timestamp: "2026-09-29T18:00:00Z"
    },
    aiMetadata: {
      confidence: 94,
      detectedKeywords: ["trash bins", "overflowing", "garbage bags", "rodents", "spilling"],
      reasoning: "Classified as Sanitation issue. Public health risk classified as Medium priority."
    }
  },
  {
    id: "issue-4",
    ticketId: "#CIVIC-8519",
    title: "Broken Streetlight & Exposed Wiring Near Elementary School",
    description: "Streetlight #ST-402 pole knocked by delivery truck. Base cover is missing, revealing exposed live wires at child eye-level. Total darkness at night along the crosswalk.",
    category: "Electrical",
    urgency: "Emergency",
    status: "Under Review",
    location: {
      lat: 40.7090,
      lng: -74.0150,
      address: "52 Battery Place",
      neighborhood: "Waterfront District",
      landmark: "Near PS 89 Elementary Entrance"
    },
    mediaUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80",
    beforePhotoUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80",
    afterPhotoUrl: "",
    reportedAt: "2026-10-02T19:40:00Z",
    updatedAt: "2026-10-02T20:10:00Z",
    reporter: {
      name: "Arthur Jenkins",
      contact: "arthur.j@example.com",
      isAnonymous: false
    },
    upvotes: 82,
    hasUpvoted: true,
    department: "Bureau of Electrical Grid & Lighting",
    assignedTeam: {
      name: "Grid Safety Unit 07",
      leadWorker: "Lineman Scott Peterson",
      contactNumber: "+1 (555) 901-4432"
    },
    eta: "Under Immediate Dispatch",
    timeline: [
      {
        id: "t4-1",
        status: "Submitted",
        timestamp: "2026-10-02T19:40:00Z",
        title: "Emergency Hazard Reported",
        description: "Citizen reported exposed live wires near school crosswalk.",
        actor: "Arthur Jenkins",
        role: "Citizen"
      },
      {
        id: "t4-2",
        status: "Under Review",
        timestamp: "2026-10-02T20:10:00Z",
        title: "Emergency Safety Protocol Triggered",
        description: "Priority escalated to Emergency. Field safety beacon illuminated.",
        actor: "Civic Safety Sentinel",
        role: "Municipal System"
      }
    ],
    comments: [
      {
        id: "c4-1",
        author: "Principal Morrison",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80",
        timestamp: "2026-10-02T20:25:00Z",
        content: "We have placed temporary yellow warning tape around the base. School starts tomorrow at 8 AM, urgent fix required!"
      }
    ],
    aiMetadata: {
      confidence: 98,
      detectedKeywords: ["broken streetlight", "exposed wiring", "live wires", "elementary school", "darkness"],
      reasoning: "Critical electrocution hazard adjacent to educational facility. Automatically marked as Emergency."
    }
  },
  {
    id: "issue-5",
    ticketId: "#CIVIC-8450",
    title: "Storm Drain Clogged With Tree Debris Causing Street Pooling",
    description: "Stormwater grate is completely sealed with thick autumn leaves and discarded plastic bottles. Even light rain causes 4-inch deep puddles blocking pedestrian crossing and wheelchair ramps.",
    category: "Water & Drainage",
    urgency: "Medium",
    status: "In Progress",
    location: {
      lat: 40.7160,
      lng: -73.9980,
      address: "215 Bowery & Delancey St",
      neighborhood: "East Village Border",
      landmark: "At accessible sidewalk ramp"
    },
    mediaUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80",
    beforePhotoUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80",
    afterPhotoUrl: "",
    reportedAt: "2026-10-01T15:20:00Z",
    updatedAt: "2026-10-02T11:00:00Z",
    reporter: {
      name: "Hannah Cruz",
      contact: "hannah.cruz@example.com",
      isAnonymous: false
    },
    upvotes: 29,
    hasUpvoted: false,
    department: "Water & Sewer Authority",
    assignedTeam: {
      name: "Drainage Jet-Vac Crew B",
      leadWorker: "Tech Marcus Cole",
      contactNumber: "+1 (555) 662-3118"
    },
    eta: "Tomorrow by 11:00 AM",
    timeline: [
      {
        id: "t5-1",
        status: "Submitted",
        timestamp: "2026-10-01T15:20:00Z",
        title: "Clogged Drain Logged",
        description: "Submitted with photos of pooling rainwater.",
        actor: "Hannah Cruz",
        role: "Citizen"
      },
      {
        id: "t5-2",
        status: "Under Review",
        timestamp: "2026-10-01T18:00:00Z",
        title: "Classified for Hydro-Cleaning",
        description: "Scheduled for high-pressure suction clearing.",
        actor: "Drainage Maintenance Board",
        role: "Department Head"
      },
      {
        id: "t5-3",
        status: "In Progress",
        timestamp: "2026-10-02T11:00:00Z",
        title: "Suction Truck Deployed",
        description: "Vac-truck clearing debris line.",
        actor: "Tech Marcus Cole",
        role: "Field Team"
      }
    ],
    comments: [],
    aiMetadata: {
      confidence: 93,
      detectedKeywords: ["storm drain", "clogged", "tree debris", "pooling", "wheelchair ramp"],
      reasoning: "Accessibility blockage and water retention risk. Medium urgency."
    }
  },
  {
    id: "issue-6",
    ticketId: "#CIVIC-8290",
    title: "Vandalized Park Playground Swing & Rusted Chain",
    description: "Central swing set chain is severed and dangling with jagged metal links. Another toddler swing has cracked hard plastic. Children are attempting to climb damaged support arch.",
    category: "Parks & Recreation",
    urgency: "High",
    status: "Resolved",
    location: {
      lat: 40.7280,
      lng: -73.9920,
      address: "Tompkins Green Park",
      neighborhood: "East Village",
      landmark: "North Playfield Area"
    },
    mediaUrl: "https://images.unsplash.com/photo-1575783970733-1aaedde1db74?auto=format&fit=crop&w=900&q=80",
    beforePhotoUrl: "https://images.unsplash.com/photo-1575783970733-1aaedde1db74?auto=format&fit=crop&w=900&q=80",
    afterPhotoUrl: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=900&q=80",
    reportedAt: "2026-09-25T11:15:00Z",
    updatedAt: "2026-09-27T17:00:00Z",
    reporter: {
      name: "Tanya Brooks",
      contact: "tanya.b@example.com",
      isAnonymous: false
    },
    upvotes: 53,
    hasUpvoted: true,
    department: "Parks & Recreation Maintenance",
    assignedTeam: {
      name: "Playground Safety Specialists",
      leadWorker: "Officer Liam O'Connor",
      contactNumber: "+1 (555) 441-2390"
    },
    eta: "Completed",
    timeline: [
      {
        id: "t6-1",
        status: "Submitted",
        timestamp: "2026-09-25T11:15:00Z",
        title: "Playground Hazard Logged",
        description: "Severed swing chain reported.",
        actor: "Tanya Brooks",
        role: "Citizen"
      },
      {
        id: "t6-2",
        status: "Assigned",
        timestamp: "2026-09-26T09:00:00Z",
        title: "Hardware Ordered",
        description: "Commercial stainless-steel chains and safety seats requisitioned.",
        actor: "Parks Operations",
        role: "Department Head"
      },
      {
        id: "t6-3",
        status: "In Progress",
        timestamp: "2026-09-27T10:00:00Z",
        title: "Installation & Safety Testing",
        description: "Chains replaced and load-bearing test executed.",
        actor: "Officer Liam O'Connor",
        role: "Field Team"
      },
      {
        id: "t6-4",
        status: "Resolved",
        timestamp: "2026-09-27T17:00:00Z",
        title: "Certified Safe for Use",
        description: "New safety coated chains, heavy duty seats installed.",
        actor: "Officer Liam O'Connor",
        role: "Field Team"
      }
    ],
    comments: [
      {
        id: "c6-1",
        author: "Officer Liam O'Connor",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80",
        timestamp: "2026-09-27T17:05:00Z",
        content: "Both standard swings and toddler bucket seats replaced with rubberized comfort chains. Inspected for full ASTM safety standards.",
        isOfficial: true
      }
    ],
    feedback: {
      rating: 5,
      feedbackText: "The new swings are great! My 4-year-old was so happy playing today.",
      isResolvedConfirmed: true,
      citizenName: "Tanya Brooks",
      timestamp: "2026-09-28T10:12:00Z"
    },
    aiMetadata: {
      confidence: 95,
      detectedKeywords: ["playground", "swing", "broken chain", "jagged metal", "children"],
      reasoning: "Direct injury risk for children on municipal recreational facility."
    }
  },
  {
    id: "issue-7",
    ticketId: "#CIVIC-8534",
    title: "Broken Guardrail & Blind Spot On High-Speed Boulevard Curve",
    description: "Guardrail damaged during recent accident is buckling into lane of traffic. Reflectors are shattered, creating a hazardous blind corner during night driving and heavy fog.",
    category: "Public Safety",
    urgency: "High",
    status: "Submitted",
    location: {
      lat: 40.7320,
      lng: -74.0040,
      address: "West Side Highway & 14th St Overpass",
      neighborhood: "Meatpacking District",
      landmark: "Near Northbound ramp curve"
    },
    mediaUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=900&q=80",
    beforePhotoUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=900&q=80",
    afterPhotoUrl: "",
    reportedAt: "2026-10-03T02:45:00Z",
    updatedAt: "2026-10-03T02:45:00Z",
    reporter: {
      name: "Anonymous Citizen",
      isAnonymous: true
    },
    upvotes: 19,
    hasUpvoted: false,
    department: "Department of Transportation & Safety",
    assignedTeam: null,
    eta: "Pending review",
    timeline: [
      {
        id: "t7-1",
        status: "Submitted",
        timestamp: "2026-10-03T02:45:00Z",
        title: "Report Submitted via Mobile App",
        description: "Report filed anonymously with photo capture.",
        actor: "Anonymous Citizen",
        role: "Citizen"
      }
    ],
    comments: [],
    aiMetadata: {
      confidence: 92,
      detectedKeywords: ["guardrail", "accident", "blind spot", "night driving", "buckling"],
      reasoning: "High-speed vehicular trajectory protection compromised. Immediate assessment recommended."
    }
  },
  {
    id: "issue-8",
    ticketId: "#CIVIC-8540",
    title: "Overgrown Tree Limbs Tangled in Secondary Power Cables",
    description: "Heavy oak branch resting directly on overhead telephone and low-voltage electrical distribution lines. With upcoming windy weather forecast, there is high danger of sparking or power outage.",
    category: "Infrastructure",
    urgency: "Medium",
    status: "Under Review",
    location: {
      lat: 40.7220,
      lng: -73.9850,
      address: "630 East 6th Street",
      neighborhood: "Alphabet City",
      landmark: "In front of Community Garden"
    },
    mediaUrl: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=900&q=80",
    beforePhotoUrl: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=900&q=80",
    afterPhotoUrl: "",
    reportedAt: "2026-10-03T05:15:00Z",
    updatedAt: "2026-10-03T06:00:00Z",
    reporter: {
      name: "Julian Rivera",
      contact: "julian.r@example.com",
      isAnonymous: false
    },
    upvotes: 14,
    hasUpvoted: false,
    department: "Urban Forestry & Public Utilities",
    assignedTeam: null,
    eta: "Awaiting tree pruning crew schedule",
    timeline: [
      {
        id: "t8-1",
        status: "Submitted",
        timestamp: "2026-10-03T05:15:00Z",
        title: "Arbor Hazard Reported",
        description: "Citizen reported branch strain on power lines.",
        actor: "Julian Rivera",
        role: "Citizen"
      },
      {
        id: "t8-2",
        status: "Under Review",
        timestamp: "2026-10-03T06:00:00Z",
        title: "Cross-Departmental Referral",
        description: "Forestry unit reviewing bucket truck route schedule.",
        actor: "Municipal Dispatch",
        role: "Municipal System"
      }
    ],
    comments: [],
    aiMetadata: {
      confidence: 89,
      detectedKeywords: ["tree limbs", "power cables", "overhead", "sparking", "windy weather"],
      reasoning: "Preventative utility hazard. Requires bucket truck arborist."
    }
  }
];

export const DEPARTMENTS = [
  "Department of Public Works",
  "Department of Sanitation",
  "Water & Sewer Authority",
  "Bureau of Electrical Grid & Lighting",
  "Department of Transportation & Safety",
  "Parks & Recreation Maintenance",
  "Urban Forestry & Public Utilities"
];

export const CATEGORIES = [
  "Infrastructure",
  "Sanitation",
  "Electrical",
  "Water & Drainage",
  "Public Safety",
  "Parks & Recreation"
];

export const URGENCIES = ["Low", "Medium", "High", "Emergency"];

export const STATUSES = [
  "Submitted",
  "Under Review",
  "Assigned",
  "In Progress",
  "Resolved"
];

export const SAMPLE_PRESET_IMAGES = [
  {
    label: "Pothole / Road Crater",
    category: "Infrastructure",
    url: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80"
  },
  {
    label: "Water Main Leak",
    category: "Water & Drainage",
    url: "https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=800&q=80"
  },
  {
    label: "Overflowing Garbage Bins",
    category: "Sanitation",
    url: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80"
  },
  {
    label: "Flickering / Damaged Streetlight",
    category: "Electrical",
    url: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
  },
  {
    label: "Broken Playground Equipment",
    category: "Parks & Recreation",
    url: "https://images.unsplash.com/photo-1575783970733-1aaedde1db74?auto=format&fit=crop&w=800&q=80"
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    title: "Emergency Alert Escalated",
    message: "Live wire reported at 52 Battery Place near PS 89 (#CIVIC-8519). Grid Safety dispatched.",
    timestamp: "10 mins ago",
    type: "high_priority",
    read: false,
    ticketId: "#CIVIC-8519"
  },
  {
    id: "notif-2",
    title: "Work Order In Progress",
    message: "Asphalt Rapid Response Crew #3 has begun work on Elm St Pothole (#CIVIC-8492).",
    timestamp: "45 mins ago",
    type: "status_update",
    read: false,
    ticketId: "#CIVIC-8492"
  },
  {
    id: "notif-3",
    title: "Resolution Confirmed",
    message: "Trash overflow at Washington Plaza (#CIVIC-8340) verified resolved by citizen Priya Patel.",
    timestamp: "Yesterday",
    type: "community",
    read: true,
    ticketId: "#CIVIC-8340"
  }
];
