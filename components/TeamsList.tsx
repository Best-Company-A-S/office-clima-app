"use client";

import { Team, TeamMember } from "@prisma/client";
import { TeamCard } from "./TeamCard";
import { EmptyTeams } from "./EmptyTeams";
import { motion } from "framer-motion";

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

  // Animation variants for staggered children
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {teams.map((team, index) => (
        <TeamCard
          key={team.id}
          team={team}
          isOwner={team.ownerId === parseInt(userId)}
          membersCount={team._count.members}
          index={index}
        />
      ))}
    </motion.div>
  );
};
