import { useParams } from 'react-router-dom';

const NoteDetail: React.FC = () => {
  const { noteId } = useParams<{ noteId: string }>();

  return (
    <div>
      <h1>Project Detail</h1>
      <p>Displaying details for note ID: {noteId}</p>
    </div>
  );
};

export default NoteDetail;
