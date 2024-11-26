import { Link, useParams } from 'react-router-dom';
import SectionBox from '../../../components/app/projects/SectionBox';
import { getTheme } from '../../../utils/getTheme';
import KanbanContainer from '../../../components/app/objects/project-components/KanbanContainer';
import usePageTitle from '../../../hooks/usePageTitle';
import { projects } from '../../../utils/sampleLists';


const ProjectDetail: React.FC = () => {
  const {currentTheme} = getTheme();
  const { projectId } = useParams<{ projectId: string }>();
  const project = projects.find((p) => p.id === Number(projectId));


  // Set page title
  usePageTitle("Project - " + project?.title);

  return (
    <div className="flex flex-col fill-all bg-gradient-to-br from-green-500 to-blue-600">  
      <div className={`p-2 hover:shadow-lg ${currentTheme.kbHead.bg} ${currentTheme.hoverEffects.btnHover} transition-all`}>
        <div className={`${currentTheme.global.textSecondary} flex gap-x-2 items-baseline text-2xl`}><Link to="/projects">Projects</Link> / <h1 className={`font-bold ${currentTheme.global.textPrimary}`}>{project?.title}</h1></div>
        <p className={`${currentTheme.global.textSecondary}`}>{project?.subtitle}</p>
      </div>
      <div className='h-full'>
        <KanbanContainer />
      </div>
    </div>
  );
};

export default ProjectDetail;