import type { Job } from '@/types';
import { Briefcase, Clock, MapPin, MoreVertical, Users } from 'lucide-react';
import type React from 'react';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <p className="text-sm text-gray-600">{job.department}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              job.status === 'Ativo'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {job.status}
          </span>
          <button type="button" className="p-1 hover:bg-gray-100 rounded-full">
            <MoreVertical className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Briefcase className="w-4 h-4" />
          <span>{job.type}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span>{job.level}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>Há {job.postedDate}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills.map((skill) => (
          <span
            key={skill}
            className="px-2 py-1 bg-purple-50 text-purple-700 rounded-full text-xs"
          >
            {skill}
          </span>
        ))}
      </div>

      <button
        type="button"
        className="w-full py-2 border border-[#432B4F] text-[#432B4F] rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-center space-x-2"
      >
        <Users className="w-4 h-4" />
        <span>Visualizar candidatos</span>
      </button>
    </div>
  );
};

export { JobCard };
