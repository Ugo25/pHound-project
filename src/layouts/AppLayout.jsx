import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  LayoutDashboard, Scan, Globe, Target, 
  ShieldAlert, FileText, Settings, 
  ChevronLeft, ChevronRight, Menu, Search, Bell, User
} from 'lucide-react';
import LanguageSwitcher from '../components/common/LanguageSwitcher';
import ThemeSwitcher from '../components/common/ThemeSwitcher';
import styles from './AppLayout.module.css';

const AppLayout = ({ children }) => {
  const { t } = useTranslation('common');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/app/dashboard' },
    { icon: Scan, label: 'Escaneos', path: '/app/scans' },
    { icon: Globe, label: 'OSINT', path: '/app/osint' },
    { icon: Target, label: 'Objetivos', path: '/app/targets' },
    { icon: ShieldAlert, label: 'Vulnerabilidades', path: '/app/vulnerabilities' },
    { icon: FileText, label: 'Reportes', path: '/app/reports' },
    { icon: Settings, label: 'Configuración', path: '/app/settings' },
  ];

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);
  const toggleMobileSidebar = () => setIsMobileSidebarOpen(!isMobileSidebarOpen);

  return (
    <div className={styles.layout}>
      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div className={styles.mobileOverlay} onClick={toggleMobileSidebar} />
      )}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isSidebarCollapsed ? styles.collapsed : ''} ${isMobileSidebarOpen ? styles.mobileOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <Link to="/app/dashboard" className={styles.logoLink}>
            <img src="/logo.png" alt="pHound Logo" className={styles.logo} />
            {!isSidebarCollapsed && <span className={styles.brandName}>pHound</span>}
          </Link>
        </div>

        <nav className={styles.sidebarNav}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
              title={isSidebarCollapsed ? item.label : ''}
              onClick={() => setIsMobileSidebarOpen(false)}
            >
              <item.icon className={styles.navIcon} size={20} />
              {!isSidebarCollapsed && <span className={styles.navLabel}>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>US</div>
            {!isSidebarCollapsed && (
              <div className={styles.userDetails}>
                <span className={styles.userName}>Usuario Prueba</span>
                <span className={styles.userRole}>Admin</span>
              </div>
            )}
          </div>
          <button className={styles.collapseToggle} onClick={toggleSidebar}>
            {isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={styles.mainArea}>
        {/* Topbar */}
        <header className={styles.topbar}>
          <div className={styles.topbarLeft}>
            <button className={styles.mobileMenuToggle} onClick={toggleMobileSidebar}>
              <Menu size={24} />
            </button>
            <div className={styles.searchContainer}>
              <Search className={styles.searchIcon} size={18} />
              <input type="text" placeholder="Buscar..." className={styles.searchInput} />
            </div>
          </div>
          
          <div className={styles.topbarRight}>
            <ThemeSwitcher />
            <LanguageSwitcher />
            <button className={styles.iconButton}>
              <Bell size={20} />
              <span className={styles.badge}>3</span>
            </button>
            <div className={styles.userMenu}>
              <User size={20} />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
