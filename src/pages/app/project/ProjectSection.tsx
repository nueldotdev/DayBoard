import React from 'react'
import usePageTitle from '../../../hooks/usePageTitle';
import { useParams } from 'react-router-dom';
// import { getTheme } from '../../../utils/getTheme';
import { boards, sectionList } from '../../../utils/sampleLists';
import KanbanContainer from '../../../components/app/objects/project-components/KanbanContainer';
import { getObject } from '../../../hooks/getObj';


const ProjectSection: React.FC = () => {
  // const {currentTheme} = getTheme();

  // get project and section from params
  const { boardId } = useParams<{ boardId: string }>();
  const { sectionId } = useParams<{ sectionId: string }>();

  // get project and section from arrays
  const board = getObject(Number(boardId), boards);
  const section = getObject(Number(sectionId), sectionList);

  // Set page title
  usePageTitle(`${board?.title} - ${section?.name}`);


  return (
    <div className='h-full overflow-hidden'>
      <KanbanContainer />
    </div>
  )
}

export default ProjectSection;