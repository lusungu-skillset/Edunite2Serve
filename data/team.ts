export type TeamPerson = {
  name: string;
  role: string;
  image?: string;
  detail?: string;
  department?: string;
};

export type TeamMember = TeamPerson & {
  id?: string;
  bio: string;
  initials: string;
  order_index?: number;
  is_published?: boolean;
};

export type TeamUnit = {
  title: string;
  leader?: TeamPerson;
  members?: TeamPerson[];
  children?: TeamUnit[];
};

const executiveLead: TeamPerson = {
  name: "Sharon Pittman",
  role: "Executive Lead",
  image: "/images/team/sharon-pittman.jpg",
};

export const teamHierarchy = {
  executiveLead,
  coreTeams: [
    {
      title: "Meal Team",
      leader: { name: "Sinthan Mollen", role: "Meal Lead" },
    },
    {
      title: "Marketing & ICT",
      leader: { name: "John Chepe", role: "Marketing & ICT Lead" },
    },
    {
      title: "Operations",
      leader: { name: "Trinna Mphulla", role: "Operations Lead" },
    },
    {
      title: "Finance",
      leader: {
        name: "Juliet Dzikolo",
        role: "Finance Lead",
        image: "/images/team/juliet-dzikolo.jpg",
      },
    },
  ] satisfies TeamUnit[],
  programTeams: [
    {
      title: "FARM STEW Field Team",
      leader: {
        name: "Grey Sagawa",
        role: "FS Field Lead",
        image: "/images/team/grey-sagawa.jpg",
      },
      children: [
        {
          title: "Southern Region",
          leader: {
            name: "Bertha Malonda",
            role: "Southern Region Team Lead",
            detail: "9 trainers",
          },
        },
        {
          title: "Central Region",
          leader: {
            name: "Peter Kaniye",
            role: "Central Region Team Lead",
            detail: "8 trainers",
          },
        },
        {
          title: "Northern Region",
          leader: {
            name: "Dr Wilbert Mwale",
            role: "Northern Region Team Lead",
            detail: "6 trainers",
          },
        },
      ],
    },
    {
      title: "Virtual Learning Community (VLC)",
      leader: { name: "Joyce Dzinjalamala", role: "VLC Lead" },
      children: [
        {
          title: "Learner Engagement",
          members: [{ name: "Jane Meja", role: "Learner Engagement" }],
        },
        {
          title: "Technical Team",
          leader: { name: "Tonneck Makhongo", role: "Technical Lead" },
        },
        {
          title: "Language Specialists",
          members: [
            { name: "Nohemi Ventura", role: "Spanish Specialist" },
            { name: "Joydlynn Rivero", role: "Filipino Specialist" },
            { name: "Reeem Ayoub", role: "Arabic Specialist" },
            { name: "Edna Osindeh", role: "Swahili Specialist" },
            { name: "Patrice Baranzika", role: "French Specialist" },
            { name: "Suma Sagma", role: "Bangla Specialist" },
            { name: "Philip Javaid", role: "Urdu Specialist" },
            { name: "Ayinalem Dirbaba", role: "Oromo & Portuguese Specialist" },
          ],
        },
      ],
    },
    {
      title: "Agents of Change",
      leader: { name: "Trinna Mphulla", role: "Agents of Change Lead" },
    },
    {
      title: "Mangunda Hope School",
      leader: { name: "Maria Harawa", role: "Head Teacher" },
      members: [
        { name: "Deborah Ngulube", role: "School Team" },
        { name: "John Kachere", role: "School Team" },
        { name: "Mark David", role: "School Team" },
        { name: "Jacqueline Chilabade", role: "School Team" },
        { name: "Yankho Muhanda", role: "School Team" },
        { name: "Evelyn Mankhwala", role: "School Team" },
        { name: "Joseph Khambadza", role: "FS Teacher" },
      ],
    },
    {
      title: "Enterprise",
      leader: { name: "Zinenani Chijere Chirwa", role: "Enterprise Lead" },
      children: [
        {
          title: "Enterprise Support",
          members: [{ name: "Wezie Basikolo", role: "Enterprise Assistant" }],
        },
        {
          title: "Afripads",
          leader: { name: "Arnold Banda", role: "Afripads Lead" },
          members: [{ name: "Chrissy Gondwe", role: "Afripads Assistant" }],
        },
      ],
    },
    {
      title: "Give-HOPE",
      leader: { name: "Moses Chilopa", role: "Give-HOPE Lead" },
      members: [
        {
          name: "Kingford Zakunja",
          role: "Program Manager Intern & Program Manager",
        },
        {
          name: "Kera Mkanda Wire",
          role: "Adventist Youth Ministries Lead",
        },
        { name: "Raphael M'Meto", role: "Office Secretary" },
      ],
    },
  ] satisfies TeamUnit[],
};

function listPeople(unit: TeamUnit, department: string): TeamPerson[] {
  return [
    ...(unit.leader ? [{ ...unit.leader, department }] : []),
    ...(unit.members || []).map((person) => ({ ...person, department })),
    ...(unit.children || []).flatMap((child) => listPeople(child, department)),
  ];
}

const orderedPeople = [
  { ...teamHierarchy.executiveLead, department: "Leadership" },
  ...teamHierarchy.coreTeams.flatMap((unit) => listPeople(unit, unit.title)),
  ...teamHierarchy.programTeams.flatMap((unit) =>
    listPeople(
      unit,
      ({
        "FARM STEW Field Team": "FARM STEW",
        "Virtual Learning Community (VLC)": "Virtual Learning Community",
        "Mangunda Hope School": "Mangunda Hope School",
      } as Record<string, string>)[unit.title] || unit.title
    )
  ),
];

export const allTeamMembers: TeamMember[] = Array.from(
  orderedPeople.reduce((people, person) => {
    const existing = people.get(person.name);
    if (!existing) {
      people.set(person.name, { ...person });
    } else if (existing.role !== person.role && !existing.role.includes(person.role)) {
      existing.role = `${existing.role} / ${person.role}`;
    }
    return people;
  }, new Map<string, TeamPerson>()).values()
).map((member) => ({
  ...member,
  bio: member.detail || "",
  is_published: true,
  initials: member.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase(),
}));
