import { useState, useEffect } from 'react';
import { X, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { parseImageUrl, isDriveUrl, isRawDriveUrl } from '../../../utils/imageUtils';

export default function ItemModal({ isOpen, onClose, onSave, item, type }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      setFormData({
        title: '',
        image: '',
        desc: '',
        link: '',
        ...(type === 'portfolio' ? { category: '' } : { type: '', tech: '' }),
      });
    }
  }, [item, type, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTechChange = (e) => {
    setFormData((prev) => ({ ...prev, tech: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = { ...formData };
    if (type === 'projects' && typeof submitData.tech === 'string') {
      submitData.tech = submitData.tech.split(',').map((t) => t.trim()).filter(Boolean);
    }
    onSave(submitData);
  };

  const isDrive = isDriveUrl(formData.image);
  const isRawDrive = isRawDriveUrl(formData.image);
  const previewUrl = parseImageUrl(formData.image);

  const displayTech = Array.isArray(formData.tech) ? formData.tech.join(', ') : (formData.tech || '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm font-sans text-white overflow-y-auto">
      <div className="w-full max-w-2xl bg-[#111113] rounded-2xl border border-white/10 shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
          <h2 className="text-xl font-bold">{item ? 'Edit Item' : 'Create New Item'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto flex-1">
          <form id="item-form" onSubmit={handleSubmit} className="flex flex-col gap-5">
            
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-white/70">Title</label>
              <input required type="text" name="title" value={formData.title || ''} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:border-violet-500" />
            </div>

            {type === 'portfolio' ? (
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-white/70">Category</label>
                <input required type="text" name="category" value={formData.category || ''} onChange={handleChange} placeholder="e.g. React & PostgreSQL" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:border-violet-500" />
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-white/70">Type</label>
                  <input required type="text" name="type" value={formData.type || ''} onChange={handleChange} placeholder="e.g. AI / NLP Moderation System" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:border-violet-500" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-white/70">Tech Stack (comma separated)</label>
                  <input required type="text" name="tech" value={displayTech} onChange={handleTechChange} placeholder="React, Node.js, Python" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:border-violet-500" />
                </div>
              </>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-white/70">Image URL</label>
              <input required type="text" name="image" value={formData.image || ''} onChange={handleChange} placeholder="https://..." className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:border-violet-500" />
              
              {isDrive && (
                <div className="flex items-center gap-2 mt-2 text-xs text-emerald-400 bg-emerald-400/10 px-3 py-2 rounded-lg border border-emerald-400/20">
                  <CheckCircle2 size={14} />
                  <span>Google Drive link detected {isRawDrive ? 'and will be auto-converted' : '(already converted)'}</span>
                </div>
              )}
              
              {previewUrl && (
                <div className="mt-3 aspect-video bg-black/50 rounded-xl border border-white/10 overflow-hidden flex items-center justify-center relative group">
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }} />
                  <div className="absolute inset-0 hidden items-center justify-center flex-col gap-2 text-white/30" style={{ display: 'none' }}>
                     <ImageIcon size={32} />
                     <span className="text-xs">Image failed to load</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-white/70">Description</label>
              <textarea required name="desc" value={formData.desc || ''} onChange={handleChange} rows={4} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:border-violet-500 resize-none" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-white/70">External Link</label>
              <input required type="url" name="link" value={formData.link || ''} onChange={handleChange} placeholder="https://..." className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:border-violet-500" />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input type="checkbox" id="under_development" name="under_development" checked={formData.under_development || false} onChange={(e) => setFormData(prev => ({...prev, under_development: e.target.checked}))} className="w-5 h-5 rounded bg-black/50 border-white/10 text-violet-600 focus:ring-violet-500 focus:ring-offset-[#111113] cursor-pointer" />
              <label htmlFor="under_development" className="text-sm font-medium text-white/80 cursor-pointer select-none">Mark as "Under Development"</label>
            </div>

          </form>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 shrink-0 flex justify-end gap-3 bg-[#111113] rounded-b-2xl">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-colors font-medium">
            Cancel
          </button>
          <button form="item-form" type="submit" className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white transition-colors font-medium shadow-lg shadow-violet-600/20">
            {item ? 'Save Changes' : 'Create Item'}
          </button>
        </div>

      </div>
    </div>
  );
}
