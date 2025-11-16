import { useState } from "react";
import { Search, User, Globe, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface VRChatUser {
  id: string;
  displayName: string;
  username: string;
  status: string;
  statusDescription: string;
  trustLevel: string;
  location: string;
  joinDate: string;
  avatarUrl?: string;
}

export const VRChatSearchPanel = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<VRChatUser[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);

    // Placeholder for VRChat API integration
    setTimeout(() => {
      const mockResults: VRChatUser[] = [
        {
          id: "usr_example_1",
          displayName: "Example User 1",
          username: "exampleuser1",
          status: "active",
          statusDescription: "Just vibing in VRChat! ✨",
          trustLevel: "Trusted User",
          location: "Private World",
          joinDate: "2021-03-15",
        },
        {
          id: "usr_example_2",
          displayName: "Example User 2",
          username: "exampleuser2",
          status: "join me",
          statusDescription: "Exploring new worlds",
          trustLevel: "Known User",
          location: "Public World - The Black Cat",
          joinDate: "2022-07-22",
        },
      ];
      setResults(mockResults);
      setIsSearching(false);
    }, 1000);
  };

  const getTrustColor = (trustLevel: string) => {
    const colors: Record<string, string> = {
      "Trusted User": "bg-primary/20 text-primary border-primary/30",
      "Known User": "bg-secondary/20 text-secondary-foreground border-secondary/30",
      "User": "bg-muted/40 text-muted-foreground border-muted",
    };
    return colors[trustLevel] || colors["User"];
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      active: "bg-green-500/20 text-green-300 border-green-500/30",
      "join me": "bg-primary/20 text-primary border-primary/30",
      busy: "bg-red-500/20 text-red-300 border-red-500/30",
    };
    return colors[status] || colors["active"];
  };

  return (
    <div className="flex h-full flex-col bg-overlay/40 backdrop-blur-md rounded-3xl border border-primary/20 shadow-2xl">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-primary/20 px-6 py-4 bg-primary/10">
        <Globe className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">VRChat User Search</h2>
      </div>

      {/* Search Bar */}
      <div className="border-b border-primary/20 p-4 bg-overlay-light/40">
        <div className="flex gap-2">
          <Input
            placeholder="Search by username or display name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1 bg-background/50 border-primary/30 focus-visible:ring-primary"
          />
          <Button
            onClick={handleSearch}
            disabled={!searchQuery.trim() || isSearching}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Results */}
      <ScrollArea className="flex-1 px-6 py-4">
        {results.length === 0 && !isSearching && (
          <div className="flex h-full items-center justify-center">
            <div className="text-center text-muted-foreground">
              <Search className="mx-auto h-12 w-12 mb-3 opacity-50" />
              <p className="text-sm">Search for VRChat users to get started</p>
            </div>
          </div>
        )}

        {isSearching && (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <div className="animate-pulse text-primary mb-2">Searching...</div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {results.map((user) => (
            <Card
              key={user.id}
              className="bg-background/60 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all p-4"
            >
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                  <User className="h-8 w-8 text-white" />
                </div>

                <div className="flex-1 space-y-2">
                  <div>
                    <h3 className="font-semibold text-foreground">{user.displayName}</h3>
                    <p className="text-sm text-muted-foreground">@{user.username}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge className={getTrustColor(user.trustLevel)}>
                      {user.trustLevel}
                    </Badge>
                    <Badge className={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                  </div>

                  {user.statusDescription && (
                    <p className="text-sm text-foreground/80 italic">"{user.statusDescription}"</p>
                  )}

                  <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{user.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
