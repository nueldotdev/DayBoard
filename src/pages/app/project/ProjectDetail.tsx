import { Link, useParams } from 'react-router-dom';
import KanbanContainer from '../../../components/app/objects/project-components/KanbanContainer';
import usePageTitle from '../../../hooks/usePageTitle';
import { getTheme } from '../../../utils/getTheme';
import { projects } from '../../../utils/sampleLists';
import { useState } from 'react';
import GradientSelect from '../../../components/app/objects/ui/GradientSelect';
import Popover from '../../../components/app/objects/ui/Popover';
import { VscPaintcan } from "react-icons/vsc";

const ProjectDetail: React.FC = () => {
  const { currentTheme } = getTheme();
  const { projectId } = useParams<{ projectId: string }>();
  const project = projects.find((p) => p.id === Number(projectId));
  const [backgroundGradient, setBackgroundGradient] = useState<string>(
    "bg-gradient-to-br from-green-500 to-blue-600"
  );

  // Set page title
  usePageTitle("Project - " + project?.name);

  return (
    <div className={`flex flex-col fill-all ${backgroundGradient}`}>  
      <div className={`flex justify-between items-center p-2 hover:shadow-lg ${currentTheme.kbHead.bg} ${currentTheme.hoverEffects.btnHover} transition-all`}>
        <div className={``}>
          <div className={`${currentTheme.global.textSecondary} flex gap-x-2 items-baseline text-2xl`}>
            <Link to="/projects">Projects</Link> / 
            <h1 className={`font-bold ${currentTheme.global.textPrimary}`}>{project?.name}</h1>
          </div>
          <p className={`${currentTheme.global.textSecondary}`}>{project?.subtitle}</p>
        </div>
        <Popover content={<GradientSelect
          selectedGradient={backgroundGradient}
          onChange={(newGradient) => setBackgroundGradient(newGradient)}
          className={`${currentTheme.global.bg} rounded-lg border flex justify-center items-center`}
          theme={currentTheme}
          />}>
          <button className={`p-2 rounded-md ${currentTheme.hoverEffects.btnHover} ${currentTheme.global.text} cursor-pointer transition-colors`}>
            <VscPaintcan size={24} />
          </button>
        </Popover>
      </div>
      
      <div className="h-full w-full overflow-auto">
        <KanbanContainer />
      </div>
    </div>
  );
};

export default ProjectDetail;
