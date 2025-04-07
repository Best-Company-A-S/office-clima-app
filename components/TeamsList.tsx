"use client";

import { Team, TeamMember } from "@prisma/client";
import { TeamCard } from "./TeamCard";
import { EmptyTeams } from "./EmptyTeams";

interface TeamsWithMemberCount extends Team {
  _count: {
    members: number;
  };
}

interface TeamsListProps {
  teams: TeamsWithMemberCount[];
  userId: string;
}

export const TeamsList = ({ teams, userId }: TeamsListProps) => {
  if (!teams.length) {
    return <EmptyTeams />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {teams.map((team) => (
        <TeamCard
          key={team.id}
          team={team}
          isOwner={team.ownerId === parseInt(userId)}
          membersCount={team._count.members}
        />
      ))}
    </div>
  );
};
