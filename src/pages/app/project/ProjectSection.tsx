import React from 'react'
import usePageTitle from '../../../hooks/usePageTitle';
import { useParams } from 'react-router-dom';
import { getTheme } from '../../../utils/getTheme';
import { projects, sectionList } from '../../../utils/sampleLists';
import KanbanContainer from '../../../components/app/objects/project-components/KanbanContainer';
import { getObject } from '../../../hooks/getObj';


const ProjectSection: React.FC = () => {
  const {currentTheme} = getTheme();

  // get project and section from params
  const { projectId } = useParams<{ projectId: string }>();
  const { sectionId } = useParams<{ sectionId: string }>();

  // get project and section from arrays
  const project = getObject(Number(projectId), projects);
  const section = getObject(Number(sectionId), sectionList);

  // Set page title
  usePageTitle(`${project?.title} - ${section?.name}`);


  return (
    <div className='h-full overflow-hidden'>
      <KanbanContainer />
    </div>
  )
}

export default ProjectSection;