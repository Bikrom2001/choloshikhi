import {
  AppWindow,
  BookOpen,
  Briefcase,
  Clapperboard,
  ClipboardList,
  Code2,
  Globe,
  GraduationCap,
  Layers,
  Megaphone,
  Monitor,
  Palette,
  PenTool,
  Rocket,
  Search,
  Sparkles,
  Target,
  Terminal,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

/** Maps string keys used in data files to Lucide icons. */
const icons: Record<string, LucideIcon> = {
  app: AppWindow,
  book: BookOpen,
  briefcase: Briefcase,
  clipboard: ClipboardList,
  code: Code2,
  globe: Globe,
  graduation: GraduationCap,
  layers: Layers,
  megaphone: Megaphone,
  monitor: Monitor,
  palette: Palette,
  pen: PenTool,
  rocket: Rocket,
  search: Search,
  sparkles: Sparkles,
  target: Target,
  terminal: Terminal,
  trending: TrendingUp,
  video: Clapperboard,
};

interface IconProps {
  name: string;
  className?: string;
}

export function Icon({ name, className }: IconProps) {
  const Component = icons[name] ?? Sparkles;
  return <Component className={className} aria-hidden="true" />;
}
