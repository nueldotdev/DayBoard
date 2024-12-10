import { Link, useParams } from 'react-router-dom';
import KanbanContainer from '../../../components/app/objects/project-components/KanbanContainer';
import usePageTitle from '../../../hooks/usePageTitle';
import { getTheme } from '../../../utils/getTheme';
import { useState } from 'react';
import GradientSelect from '../../../components/app/objects/ui/GradientSelect';
import Popover from '../../../components/app/objects/ui/Popover';
import { VscPaintcan } from "react-icons/vsc";
import useBoardStore from '../../../store/boardStore';

const ProjectDetail: React.FC = () => {
  const { currentTheme } = getTheme();
  const { boards } = useBoardStore();

  const { boardId } = useParams<{ boardId: string }>();
  const board = boards.find((p) => p.id === Number(boardId));
  const [backgroundGradient, setBackgroundGradient] = useState<string>(
    currentTheme.global.bg
  );

  // Set page title
  usePageTitle("Boards - " + board?.name);

  return (
    <div className={`flex flex-col fill-all ${backgroundGradient}`}>  
      <div className={`flex justify-between items-center p-2 hover:shadow-lg ${currentTheme.kbHead.bg} ${currentTheme.hoverEffects.btnHover} transition-all`}>
        <div className={``}>
          <div className={`${currentTheme.global.textSecondary} flex gap-x-2 items-baseline text-2xl`}>
            <Link to="/app/b">Boards</Link> / 
            <h1 className={`font-bold ${currentTheme.global.textPrimary}`}>{board?.name}</h1>
          </div>
          <p className={`${currentTheme.global.textSecondary}`}>{board?.description}</p>
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
        <KanbanContainer theme={currentTheme} board={board!} />
      </div>
    </div>
  );
};

export default ProjectDetail;
