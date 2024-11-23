import { Link, useParams } from 'react-router-dom';
import SectionBox from '../../../components/app/projects/SectionBox';
import { getTheme } from '../../../utils/getTheme';
import KanbanContainer from '../../../components/app/objects/project-components/KanbanContainer';

const projects = [
  {
    id: 1,
    title: "Digital Ocean",
    subtitle: "Social Media Strategy · Social Media Branding",
    daysLeft: "2 days left",
    progress: 56,
    avatars: [
      "https://ui-avatars.com/api/?name=Alice+Brown&background=random",
      "https://ui-avatars.com/api/?name=Bob+Johnson&background=random",
    ],
  },
  {
    id: 2,
    title: "IBM",
    subtitle: "Branding IBM Lab Company · Social Media Strategy · Website Concept",
    progress: 82,
    avatars: [
      "https://ui-avatars.com/api/?name=Alice+Brown&background=random",
      "https://ui-avatars.com/api/?name=Bob+Johnson&background=random",
    ],
  },
  // Add more project objects as needed...
];

const ProjectDetail: React.FC = () => {
  const {currentTheme} = getTheme();

  //  May use later
  const { projectId } = useParams<{ projectId: string }>();

  const project = projects.find((p) => p.id === Number(projectId));

  return (
    <div className="p-4 space-y-8">  
      <div className='my-2'>
        <div className={`${currentTheme.global.textSecondary} flex gap-x-2 items-baseline text-2xl`}><Link to="/projects">Projects</Link> / <h1 className={`text-4xl font-bold mb-4 ${currentTheme.global.textPrimary}`}>{project?.title}</h1></div>
        <p className={`${currentTheme.global.textSecondary}`}>{project?.subtitle}</p>
      </div>
      <SectionBox />
      <KanbanContainer />
    </div>
  );
};

export default ProjectDetail;