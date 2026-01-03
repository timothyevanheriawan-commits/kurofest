export type NodeType = "stage" | "booth" | "food" | "rest" | "entrance";

export interface MapNode {
  id: string;
  label: string;
  label_ja: string;
  type: NodeType;
  x: number;
  y: number;
  description?: string;
}

export const NODE_TYPE_CONFIG: Record<
  NodeType,
  { label: string; labelJa: string; color: string }
> = {
  stage: {
    label: "Stage",
    labelJa: "ステージ",
    color: "#c53030", // shu-600 equivalent
  },
  booth: {
    label: "Booth",
    labelJa: "ブース",
    color: "#1a1a1a", // sumi-950 equivalent
  },
  food: {
    label: "Food",
    labelJa: "飲食",
    color: "#525252", // sumi-600 equivalent
  },
  rest: {
    label: "Rest Area",
    labelJa: "休憩所",
    color: "#737373", // sumi-400 equivalent
  },
  entrance: {
    label: "Entrance",
    labelJa: "入口",
    color: "#404040", // sumi-700 equivalent
  },
};

export const MAP_NODES: MapNode[] = [
  {
    id: "main-stage",
    label: "Main Stage",
    label_ja: "メインステージ",
    type: "stage",
    x: 50,
    y: 18,
    description:
      "The heart of KuroFest. Major performances, ceremonies, and headline events.",
  },
  {
    id: "stage-b",
    label: "Stage B",
    label_ja: "ステージB",
    type: "stage",
    x: 79,
    y: 44,
    description:
      "Panels, workshops, voice actor sessions, and intimate performances.",
  },
  {
    id: "artist-alley",
    label: "Artist Alley",
    label_ja: "アーティストアレイ",
    type: "booth",
    x: 25,
    y: 48,
    description:
      "Browse works from 200+ independent artists. Prints, crafts, and original creations.",
  },
  {
    id: "cosplay-zone",
    label: "Cosplay Zone",
    label_ja: "コスプレゾーン",
    type: "booth",
    x: 72,
    y: 75,
    description:
      "Photo opportunities, changing rooms, prop check, and cosplay meetups.",
  },
  {
    id: "food-court",
    label: "Food Court",
    label_ja: "フードコート",
    type: "food",
    x: 20,
    y: 75,
    description:
      "Japanese street food, bento boxes, bubble tea, and refreshments.",
  },
  {
    id: "rest-area",
    label: "Rest Area",
    label_ja: "休憩エリア",
    type: "rest",
    x: 43,
    y: 71,
    description:
      "Quiet space to relax, charge devices, and take a break from the action.",
  },
  {
    id: "main-entrance",
    label: "Main Entrance",
    label_ja: "正面入口",
    type: "entrance",
    x: 50,
    y: 95,
    description:
      "Primary entrance from Kokusai-Tenjijo Station. Bag check and ticket scan.",
  },
];

export function getNodeById(id: string): MapNode | undefined {
  return MAP_NODES.find((node) => node.id === id);
}

export function getNodesByType(type: NodeType): MapNode[] {
  return MAP_NODES.filter((node) => node.type === type);
}
