import { useParams } from 'react-router-dom';
import SectionBox from '../../../components/app/projects/SectionBox';

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();

  return (
    <div className="p-4">
      <h1>Projects / {projectId}</h1>
      <SectionBox />
    </div>
  );
};

export default ProjectDetail;
