import React, { useState } from 'react';
import { HiChevronRight, HiFolder, HiMagnifyingGlass, HiOutlinePlus } from 'react-icons/hi2';
import { getTheme } from '../../../utils/getTheme';
import { Dialog } from 'primereact/dialog';


const sectionList = [
  {
    id: 1,
    name: 'Myvie',
    entries: 12,
    color: '#ff0000'
  },
  {
    id: 2,
    name: 'MagniVerse',
    entries: 3,
    color: '#00ff00'
  },
  {
    id: 3,
    name: 'Clink',
    entries: 0,
    color: '#0000ff'
  },
  {
    id: 4,
    name: 'Re-Call',
    entries: 3,
    color: '#fff371'
  },
  {
    id: 5,
    name: 'Notem',
    entries: 3,
    color: '#72ff43'
  },
  {
    id: 6,
    name: 'PixelPals',
    entries: 7,
    color: '#77ffef'
  },
];

const SectionBox: React.FC = () => {
  const currentTheme = getTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [visible, setVisible] = useState(false);

  // Filter sections based on search query
  const filteredSections = sectionList.filter(section =>
    section.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
    <div className="p-4">
      <div className={`mb-6`}>
        <div className={`flex px-2 py-1 items-center rounded-lg w-fit border ${currentTheme.border}`}>
          <HiMagnifyingGlass size={24} />
          {/* Search bar */}
          <input
            type="text"
            placeholder="Search sections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`p-2 ${currentTheme.bg} ${currentTheme.text} placeholder:${currentTheme.textSecondary} focus:outline-none rounded-lg`}
          />
        </div>
      </div>

      {/* Section boxes (side by side) */}
      <div className="flex flex-wrap gap-4">
        {filteredSections.map(section => (
          <div
            key={section.id}
            className="flex items-center p-4 rounded-lg shadow-md w-64"
            style={{
              backgroundColor: `${section.color}11` // Adding transparency with '33'
            }}
          >
            <HiFolder className="mr-3" style={{ color: section.color }} />
            {/* Section name and entries */}
            <div className="flex-1">{/* Folder Icon with color */}
              <h2 className="text-lg">{section.name}</h2>
            </div>

            {/* Chevron icon for opening (placeholder) */}
            <div className='flex'>
              <span className={`text-sm ${currentTheme.textSecondary}`}>{section.entries}</span>
              <span className="text-xl"><HiChevronRight /></span>
            </div>
          </div>
        ))}
        <button className={`flex items-center justify-center p-4 rounded-lg shadow-md w-64 border-dashed border-2 ${currentTheme.border}`} onClick={() => setVisible(true)} >
          {/* Section name and entries */}
          <div className="flex justify-center items-center gap-x-2">{/* Folder Icon with color */}
            <HiOutlinePlus size={20}/>
            <h2 className="text-lg">New Folder</h2>
          </div>
        </button>
      </div>
      </div>
      <Dialog visible={visible} onHide={() => setVisible(false)}>
        <p>Content</p>
      </Dialog>
    </>
  );
};

export default SectionBox;
