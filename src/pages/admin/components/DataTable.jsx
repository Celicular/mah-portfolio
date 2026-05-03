import { GripVertical, Eye, EyeOff, Edit2, Trash2, Wrench } from 'lucide-react';
import { Reorder } from 'framer-motion';
import { parseImageUrl } from '../../../utils/imageUtils';

export default function DataTable({ items, setItems, onEdit, onDelete, onToggleVisibility, onReorder, onToggleDev }) {
  if (!items || items.length === 0) {
    return (
      <div className="py-12 text-center text-white/40 border border-dashed border-white/10 rounded-2xl">
        No items found. Click "Add New" to create one.
      </div>
    );
  }

  const handleReorder = (newItems) => {
    setItems(newItems); // Optimistic UI update
    const ids = newItems.map(item => item.id);
    onReorder(ids); // Call API
  };

  return (
    <div className="bg-[#111113] border border-white/10 rounded-2xl overflow-hidden">
      <Reorder.Group axis="y" values={items} onReorder={handleReorder} className="flex flex-col list-none p-0 m-0 w-full">
        {items.map((item) => (
          <Reorder.Item
            key={item.id}
            value={item}
            className={`flex items-center gap-4 p-4 border-b border-white/5 bg-[#111113] cursor-grab active:cursor-grabbing hover:bg-white/[0.02] transition-colors relative z-0 ${item.hidden ? 'opacity-60' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: item.hidden ? 0.6 : 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Drag Handle */}
            <div className="text-white/20 hover:text-white/50 transition-colors shrink-0">
              <GripVertical size={20} />
            </div>

            {/* Thumbnail */}
            <div className="w-16 h-12 bg-black/50 rounded-lg overflow-hidden shrink-0 border border-white/5 relative">
              <img src={parseImageUrl(item.image)} alt={item.title} className="w-full h-full object-cover" onError={(e) => e.target.style.display='none'} />
              {item.hidden && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-[2px]">
                  <EyeOff size={16} className="text-white/80" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-white truncate text-sm md:text-base">{item.title}</h4>
              <p className="text-white/40 text-xs truncate mt-0.5">
                {item.category || item.type}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 md:gap-2 shrink-0">
              <button 
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleDev(item.id); }}
                className={`p-2 rounded-lg transition-colors ${item.under_development ? 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20' : 'text-white/40 hover:bg-amber-500/10 hover:text-amber-500'}`}
                title={item.under_development ? "Remove Under Development" : "Mark as Under Development"}
              >
                <Wrench size={18} />
              </button>
              <button 
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleVisibility(item.id); }}
                className={`p-2 rounded-lg transition-colors ${item.hidden ? 'bg-white/10 text-white hover:bg-white/20' : 'text-white/40 hover:bg-white/10 hover:text-white'}`}
                title={item.hidden ? "Unhide" : "Hide"}
              >
                {item.hidden ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              <button 
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onEdit(item); }}
                className="p-2 text-white/40 hover:bg-blue-500/10 hover:text-blue-400 rounded-lg transition-colors"
                title="Edit"
              >
                <Edit2 size={18} />
              </button>
              <button 
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(item.id); }}
                className="p-2 text-white/40 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-colors"
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
}
