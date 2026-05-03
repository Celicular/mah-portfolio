import { useState, useEffect } from 'react';
import { LogOut, Plus, RefreshCw } from 'lucide-react';
import LoginScreen from './admin/components/LoginScreen';
import DataTable from './admin/components/DataTable';
import ItemModal from './admin/components/ItemModal';

export default function AdminPanel() {
  const [password, setPassword] = useState(sessionStorage.getItem('admin_password') || null);
  const [activeTab, setActiveTab] = useState('portfolio'); // 'portfolio' or 'projects'
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Fetch data
  const fetchData = async () => {
    if (!password) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/${activeTab}/all`, {
        headers: { 'X-Admin-Password': password }
      });
      if (res.status === 401) {
        sessionStorage.removeItem('admin_password');
        setPassword(null);
        throw new Error('Invalid password');
      }
      if (!res.ok) throw new Error('Failed to fetch data');
      const data = await res.json();
      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab, password]);

  const handleLogin = (pass) => {
    sessionStorage.setItem('admin_password', pass);
    setPassword(pass);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_password');
    setPassword(null);
  };

  // API Actions
  const handleToggleVisibility = async (id) => {
    try {
      const res = await fetch(`/api/${activeTab}/${id}/toggle`, {
        method: 'PATCH',
        headers: { 'X-Admin-Password': password }
      });
      if (res.ok) {
        setItems(items.map(item => item.id === id ? { ...item, hidden: !item.hidden } : item));
      }
    } catch (err) {
      console.error(err);
      alert('Failed to toggle visibility');
    }
  };

  const handleToggleDev = async (id) => {
    try {
      const res = await fetch(`/api/${activeTab}/${id}/dev`, {
        method: 'PATCH',
        headers: { 'X-Admin-Password': password }
      });
      if (res.ok) {
        setItems(items.map(item => item.id === id ? { ...item, under_development: !item.under_development } : item));
      }
    } catch (err) {
      console.error(err);
      alert('Failed to toggle under development status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      const res = await fetch(`/api/${activeTab}/${id}`, {
        method: 'DELETE',
        headers: { 'X-Admin-Password': password }
      });
      if (res.ok) {
        setItems(items.filter(item => item.id !== id));
      }
    } catch (err) {
      console.error(err);
      alert('Failed to delete item');
    }
  };

  const handleReorder = async (ids) => {
    try {
      await fetch(`/api/${activeTab}/reorder`, {
        method: 'PATCH',
        headers: { 
          'X-Admin-Password': password,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ids })
      });
    } catch (err) {
      console.error(err);
      alert('Failed to save order');
      fetchData(); // Revert
    }
  };

  const handleSaveItem = async (formData) => {
    const isEditing = !!editingItem;
    const url = isEditing ? `/api/${activeTab}/${editingItem.id}` : `/api/${activeTab}`;
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'X-Admin-Password': password,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (!res.ok) throw new Error('Failed to save item');
      
      setIsModalOpen(false);
      fetchData(); // Refresh list
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const openCreateModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  // If not logged in
  if (!password) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#09090b] font-sans text-white pb-20">
      
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#09090b]/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 max-w-5xl h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center font-bold font-mono">
              C
            </div>
            <span className="font-bold tracking-tight">Admin Dashboard</span>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 max-w-5xl mt-10">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">Content Manager</h1>
            <p className="text-white/50">Manage your portfolio and personal projects data.</p>
          </div>
          <button 
            onClick={openCreateModal}
            className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-all shadow-lg shadow-violet-600/20"
          >
            <Plus size={18} /> Add New {activeTab === 'portfolio' ? 'Portfolio Item' : 'Project'}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 p-1.5 bg-white/5 border border-white/10 rounded-2xl w-fit mb-6">
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all ${activeTab === 'portfolio' ? 'bg-[#111113] text-white shadow-sm border border-white/5' : 'text-white/50 hover:text-white'}`}
          >
            Portfolio
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all ${activeTab === 'projects' ? 'bg-[#111113] text-white shadow-sm border border-white/5' : 'text-white/50 hover:text-white'}`}
          >
            Personal Projects
          </button>
        </div>

        {/* Data Area */}
        {error ? (
          <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 flex items-center justify-between">
            <span>Error: {error}</span>
            <button onClick={fetchData} className="p-2 hover:bg-red-500/20 rounded-lg"><RefreshCw size={16} /></button>
          </div>
        ) : loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-4 text-white/50">
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-2.5 h-2.5 rounded-full bg-violet-600 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
            <span className="text-sm">Loading data...</span>
          </div>
        ) : (
          <DataTable 
            items={items} 
            setItems={setItems}
            onEdit={openEditModal}
            onDelete={handleDelete}
            onToggleVisibility={handleToggleVisibility}
            onToggleDev={handleToggleDev}
            onReorder={handleReorder}
          />
        )}
      </main>

      {/* Modal */}
      <ItemModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={editingItem}
        type={activeTab}
        onSave={handleSaveItem}
      />

    </div>
  );
}
