import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import { CheckCircle, Clock, AlertCircle, ListTodo } from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    total: 0,
    todo: 0,
    inProgress: 0,
    completed: 0,
    overdue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get('/tasks');
        const tasks = res.data.data;
        
        const now = new Date();
        let todo = 0, inProgress = 0, completed = 0, overdue = 0;

        tasks.forEach(task => {
          if (task.status === 'To Do') todo++;
          if (task.status === 'In Progress') inProgress++;
          if (task.status === 'Completed') completed++;
          
          if (new Date(task.dueDate) < now && task.status !== 'Completed') {
            overdue++;
          }
        });

        setStats({
          total: tasks.length,
          todo,
          inProgress,
          completed,
          overdue
        });
      } catch (error) {
        console.error('Error fetching tasks', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading dashboard...</div>;
  }

  const StatCard = ({ title, value, icon: Icon, colorClass, bgColorClass }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 transition-all hover:shadow-md">
      <div className={`p-4 rounded-xl ${bgColorClass} ${colorClass}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="text-gray-500 mt-1">Here is what's happening with your tasks today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Tasks" 
          value={stats.total} 
          icon={ListTodo} 
          colorClass="text-primary-600" 
          bgColorClass="bg-primary-50" 
        />
        <StatCard 
          title="In Progress" 
          value={stats.inProgress} 
          icon={Clock} 
          colorClass="text-yellow-600" 
          bgColorClass="bg-yellow-50" 
        />
        <StatCard 
          title="Completed" 
          value={stats.completed} 
          icon={CheckCircle} 
          colorClass="text-green-600" 
          bgColorClass="bg-green-50" 
        />
        <StatCard 
          title="Overdue" 
          value={stats.overdue} 
          icon={AlertCircle} 
          colorClass="text-red-600" 
          bgColorClass="bg-red-50" 
        />
      </div>
      
      <div className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <div className="mx-auto w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mb-4">
          <ListTodo className="h-8 w-8 text-primary-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to work?</h3>
        <p className="text-gray-500 max-w-md mx-auto mb-6">
          Check out your assigned projects to see the details of your tasks and update their status.
        </p>
        <a href="/projects" className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700">
          View Projects
        </a>
      </div>
    </div>
  );
};

export default Dashboard;
