import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

export interface Filters {
  keyword: string;
  location: string;
  mode: string;
  experience: string;
  source: string;
  sort: string;
}

interface FilterBarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  locations: string[];
}

const FilterBar = ({ filters, onChange, locations }: FilterBarProps) => {
  const set = (key: keyof Filters, value: string) =>
    onChange({ ...filters, [key]: value });

  return (
    <div className="flex flex-wrap items-end gap-space-2">
      <div className="relative min-w-[200px] flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search title or company…"
          value={filters.keyword}
          onChange={(e) => set("keyword", e.target.value)}
          className="pl-9"
        />
      </div>

      <Select value={filters.location} onValueChange={(v) => set("location", v)}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Location" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Locations</SelectItem>
          {locations.map((l) => (
            <SelectItem key={l} value={l}>
              {l}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.mode} onValueChange={(v) => set("mode", v)}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Mode" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Modes</SelectItem>
          <SelectItem value="Remote">Remote</SelectItem>
          <SelectItem value="Hybrid">Hybrid</SelectItem>
          <SelectItem value="Onsite">Onsite</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filters.experience} onValueChange={(v) => set("experience", v)}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Experience" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Levels</SelectItem>
          <SelectItem value="Fresher">Fresher</SelectItem>
          <SelectItem value="0-1">0–1 yrs</SelectItem>
          <SelectItem value="1-3">1–3 yrs</SelectItem>
          <SelectItem value="3-5">3–5 yrs</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filters.source} onValueChange={(v) => set("source", v)}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Source" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Sources</SelectItem>
          <SelectItem value="LinkedIn">LinkedIn</SelectItem>
          <SelectItem value="Naukri">Naukri</SelectItem>
          <SelectItem value="Indeed">Indeed</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filters.sort} onValueChange={(v) => set("sort", v)}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="latest">Latest</SelectItem>
          <SelectItem value="oldest">Oldest</SelectItem>
          <SelectItem value="match-score">Match Score</SelectItem>
          <SelectItem value="salary">Salary</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterBar;
