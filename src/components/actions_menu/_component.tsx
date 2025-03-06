import { useState } from "react";

function ActionsMenu({ row }: any) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="relative">
        <button
          className="px-2 text-gray-400 hover:text-gray-600"
          onClick={() => setOpen(!open)}
        >
          ⋯
        </button>

        {open && (
          <div className="absolute right-0 z-50 mt-2 bg-white border rounded-md shadow-lg w-36">
            <button
              className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
              onClick={() => {
                setOpen(false);
                alert(`Editing ${row.name}`);
              }}
            >
              Edit Portfolio
            </button>
            <button
              className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
              onClick={() => {
                setOpen(false);
                alert(`Viewing ${row.name}`);
              }}
            >
              View Portfolio
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default ActionsMenu;
