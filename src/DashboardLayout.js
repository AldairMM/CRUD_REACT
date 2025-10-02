import React, { useState } from 'react';
import './DashboardLayout.css';

import CreateEntities from './components/CreateEntities';

const navItems = [
  { name: 'Inicio', id: 'home' },
  { name: 'Agregar Entidad', id: 'add' }
];

function DashboardLayout({ children }) {
  const [active, setActive] = useState('home');

  let content;
  if (active === 'add') {
    content = <CreateEntities />;
  } else {
    content = children || <p>Bienvenido al panel de control.</p>;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>MOBO</h1>
      </header>
      <div className="dashboard-main">
        <aside className="dashboard-sidebar">
          <nav>
            <ul>
              {navItems.map(item => (
                <li
                  key={item.id}
                  className={active === item.id ? 'active' : ''}
                  onClick={() => setActive(item.id)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <section className="dashboard-content">
          {content}
        </section>
      </div>
    </div>
  );
}

export default DashboardLayout;
