/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Home, User, FileText, Calendar, MessageSquare, Settings, Bell, HelpCircle,
  LayoutGrid, CheckSquare, Search, List, Zap, BarChart3, Shield, Briefcase,
  Plus, Image as ImageIcon, Trash2, RefreshCw, Play, FileVideo, Download, X, Clock,
  Navigation, Star, MapPin, Radio, Wrench
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ContentItem {
  id: string;
  type: 'text' | 'image';
  content: string;
  images?: string[];
  caption?: string;
}

export default function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeMenu, setActiveMenu] = useState('过程展望');
  
  // Form State
  const [title, setTitle] = useState('未来一周人影作业展望');
  const [subtitle, setSubtitle] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [week, setWeek] = useState(1);
  const [periodDesc, setPeriodDesc] = useState('');
  const [makeTime, setMakeTime] = useState('2026-03-16T14:57');
  const [makeUnit, setMakeUnit] = useState('中国气象局人工影响天气中心');
  const [startTime, setStartTime] = useState('2026-03-17');
  const [endTime, setEndTime] = useState('2026-03-23');
  const [purpose, setPurpose] = useState('增雨（雪）');
  const [region, setRegion] = useState('全国');
  const [serviceArea, setServiceArea] = useState('请选择');
  const [subSubtitle, setSubSubtitle] = useState('XXX旱区及森林火险区有增雨（雪）作业条件');
  const [maker, setMaker] = useState('');
  const [auditor, setAuditor] = useState('');
  const [signer, setSigner] = useState('史月琴');
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Dynamic Content Sections
  const [needItems, setNeedItems] = useState<ContentItem[]>([
    {
      id: '1',
      type: 'text',
      content: '综合气象、农业干旱监测和森林火险预报，目前在云南、四川西部南部、贵州东南部、广西西部、江苏南部、浙江北部、河北东北部、内蒙古东部、辽宁、吉林、黑龙江中南部等地存在中至重度、局部特重的气象和农业干旱。西南、华北和东北的部分地区伴有较高至极高森林火险等级，对人工增雨作业有较高需求。同时，西北地区东部、内蒙古中部、华北、黄淮等地易产生沙尘天气，不利于小麦生长。'
    }
  ]);

  const [prospectItems, setProspectItems] = useState<ContentItem[]>([
    {
      id: '2',
      type: 'text',
      content: '根据降水和作业过程预报，4月25-30日，四川、云南、贵州、广西等旱区将出现小到中雨天气；4月25-30日，东北旱区有小到中雨或雨夹雪天气；4月27-28日，华北冬麦区有小到中雨天气（此段自动复制作业展望图的文字）。上述地区降水云系具有冷云作业潜势，建议根据需求做好开展人工增雨作业的准备；广西西部、贵州南部地区可能有对流发生，建议加强临近监测。人影作业务必确保作业安全。'
    },
    {
      id: '3',
      type: 'image',
      content: '',
      images: ['https://images.unsplash.com/photo-1592210633466-3b8bd145bdf2?q=80&w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=400&auto=format&fit=crop'],
      caption: '图1 未来一周人影作业展望'
    }
  ]);

  const handlePreview = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowPreview(true);
    }, 1500);
  };

  const handleImageUpload = (section: 'need' | 'prospect', itemId: string, imgIdx: number) => {
    // Mock image upload
    const mockImages = [
      'https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516912481808-34061f8c630a?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=400&auto=format&fit=crop'
    ];
    const randomImg = mockImages[Math.floor(Math.random() * mockImages.length)];
    
    const setter = section === 'need' ? setNeedItems : setProspectItems;
    const items = section === 'need' ? needItems : prospectItems;
    
    setter(items.map(item => {
      if (item.id === itemId) {
        const newImages = [...(item.images || [])];
        newImages[imgIdx] = randomImg;
        return { ...item, images: newImages };
      }
      return item;
    }));
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    calculateWeekNumber();
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setPeriodDesc(`${year}年第${week}期`);
  }, [year, week]);

  const calculateWeekNumber = () => {
    const d = new Date();
    const firstDayOfYear = new Date(d.getFullYear(), 0, 1);
    let firstMonday = new Date(firstDayOfYear);
    while (firstMonday.getDay() !== 1) {
      firstMonday.setDate(firstMonday.getDate() + 1);
    }
    const totalDays = Math.floor((d.getTime() - firstMonday.getTime()) / (1000 * 60 * 60 * 24));
    const weekNum = Math.floor(totalDays / 7) + 1;
    setWeek(Math.max(weekNum, 1));
    setYear(d.getFullYear());
  };

  const addItem = (section: 'need' | 'prospect', type: 'text' | 'image') => {
    const newItem: ContentItem = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      content: '',
      ...(type === 'image' ? { images: ['', ''], caption: '新增图片说明' } : {})
    };
    if (section === 'need') setNeedItems([...needItems, newItem]);
    else setProspectItems([...prospectItems, newItem]);
  };

  const removeItem = (section: 'need' | 'prospect', id: string) => {
    if (section === 'need') setNeedItems(needItems.filter(i => i.id !== id));
    else setProspectItems(prospectItems.filter(i => i.id !== id));
  };

  const updateItem = (section: 'need' | 'prospect', id: string, field: keyof ContentItem, value: any) => {
    const setter = section === 'need' ? setNeedItems : setProspectItems;
    const items = section === 'need' ? needItems : prospectItems;
    setter(items.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const sidebarItems = [
    { icon: <Zap size={20} />, label: '过程展望' },
    { icon: <CheckSquare size={20} />, label: '测力计划' },
    { icon: <Search size={20} />, label: '条件预探' },
    { icon: <List size={20} />, label: '监测方案' },
    { icon: <Navigation size={20} />, label: '指挥实施' },
    { icon: <BarChart3 size={20} />, label: '效果评估' },
    { icon: <Shield size={20} />, label: '安全管理' },
    { icon: <Briefcase size={20} />, label: '专项服务' },
    { icon: <Wrench size={20} />, label: '工具箱' },
  ];

  const personOptions = ['花少峰', '李兰倩', '孙秀忠', '郭俊', '赵舒文', '孙佳星', '谭超', '房宸蔚', '魏蕾', '邵天彬'];
  const auditorOptions = ['刘卫国', '孙晶', '蔡淼', ...personOptions];
  const signerOptions = ['史月琴', ...personOptions];

  return (
    <div className="flex flex-col h-screen w-screen bg-[#f5f7fa] overflow-hidden font-sans text-gray-800">
      {/* Top Header */}
      <header className="h-[60px] bg-[#3A96FF] text-white flex items-center justify-between px-5 shadow-md z-50">
        <div className="text-lg font-bold tracking-wider">天工 V2.0 - 国家</div>
        
        <nav className="flex items-center gap-6 text-sm font-medium">
          <button className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"><Home size={16} /> 首页</button>
          <button className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"><User size={16} /> 用户</button>
          <button className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"><FileText size={16} /> 发布</button>
          <button className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"><Calendar size={16} /> 个例</button>
          <button className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"><MessageSquare size={16} /> 聊天</button>
          <button className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"><Settings size={16} /> 系统</button>
          <button className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"><Bell size={16} /> 消息</button>
          <button className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"><HelpCircle size={16} /> 帮助</button>
        </nav>

        <div className="text-right leading-tight">
          <div className="text-xs font-mono">{currentTime.toLocaleTimeString('zh-CN', { hour12: false })}</div>
          <div className="text-[10px] opacity-80 font-mono">{currentTime.toLocaleDateString('zh-CN')}</div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-20 bg-white border-r border-gray-200 flex flex-col pt-5 z-40">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveMenu(item.label)}
              className={`w-full py-3 flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
                activeMenu === item.label ? 'bg-[#3A96FF] text-white' : 'text-gray-500 hover:bg-[#F0F5FF]'
              }`}
            >
              {item.icon}
              <span className="text-[11px] font-medium">{item.label}</span>
            </button>
          ))}
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden p-5 gap-5">
          {/* Form Panel (Left) - 5.5 Ratio */}
          <main className="flex-[5.5] bg-white rounded shadow-lg flex flex-col overflow-hidden border border-gray-100">
            <div className="p-5 overflow-y-auto flex-1">
              <h2 className="text-[#3A96FF] text-base font-bold mb-5">过程预报与作业展望</h2>

              <div className="space-y-4">
                {/* Basic Info Section */}
                <div className="flex items-center gap-2 border-b border-gray-100 pb-1 mb-3">
                  <span className="text-sm font-bold">基本信息:</span>
                </div>

                <div className="flex items-center h-8">
                  <label className="w-24 text-sm font-medium"><span className="text-red-500 mr-1">*</span>正文标题：</label>
                  <input 
                    type="text" 
                    value={title} 
                    onChange={e => setTitle(e.target.value)}
                    className="flex-1 h-full border border-gray-300 rounded px-2 text-sm focus:outline-none focus:border-[#3A96FF]" 
                  />
                </div>

                <div className="flex items-center h-8">
                  <label className="w-24 text-sm font-medium">副标题：</label>
                  <input 
                    type="text" 
                    value={subtitle} 
                    onChange={e => setSubtitle(e.target.value)}
                    className="flex-1 h-full border border-gray-300 rounded px-2 text-sm focus:outline-none focus:border-[#3A96FF]" 
                  />
                </div>

                <div className="flex items-center h-8 gap-4">
                  <div className="flex items-center gap-2">
                    <label className="w-24 text-sm font-medium"><span className="text-red-500 mr-1">*</span>期数：</label>
                    <input type="number" value={year} onChange={e => setYear(parseInt(e.target.value))} className="w-16 h-full border border-gray-300 rounded px-2 text-sm" />
                    <span className="text-sm">年 第</span>
                    <input type="number" value={week} onChange={e => setWeek(parseInt(e.target.value))} className="w-16 h-full border border-gray-300 rounded px-2 text-sm" />
                    <span className="text-sm">期</span>
                    <button onClick={calculateWeekNumber} className="p-1.5 bg-[#F0F5FF] text-[#3A96FF] border border-[#3A96FF] rounded hover:bg-blue-100 transition-colors">
                      <RefreshCw size={14} />
                    </button>
                  </div>
                  <div className="flex-1 flex items-center gap-2">
                    <span className="text-sm whitespace-nowrap">期数说明：</span>
                    <input type="text" value={periodDesc} disabled className="flex-1 h-full bg-gray-50 border border-gray-300 rounded px-2 text-sm text-gray-400" />
                  </div>
                </div>

                <div className="flex items-center h-8 gap-4">
                  <div className="flex items-center gap-2">
                    <label className="w-24 text-sm font-medium"><span className="text-red-500 mr-1">*</span>制作时间：</label>
                    <input type="datetime-local" value={makeTime} onChange={e => setMakeTime(e.target.value)} className="h-full border border-gray-300 rounded px-2 text-sm" />
                  </div>
                  <div className="flex-1 flex items-center gap-2">
                    <label className="text-sm whitespace-nowrap"><span className="text-red-500 mr-1">*</span>制作单位：</label>
                    <select value={makeUnit} onChange={e => setMakeUnit(e.target.value)} className="flex-1 h-full border border-gray-300 rounded px-2 text-sm">
                      <option>中国气象局人工影响天气中心</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center h-8 gap-4">
                  <div className="flex items-center gap-2">
                    <label className="w-24 text-sm font-medium"><span className="text-red-500 mr-1">*</span>作业时间：</label>
                    <input type="date" value={startTime} onChange={e => setStartTime(e.target.value)} className="h-full border border-gray-300 rounded px-2 text-sm" />
                    <span className="text-sm">至</span>
                    <input type="date" value={endTime} onChange={e => setEndTime(e.target.value)} className="h-full border border-gray-300 rounded px-2 text-sm" />
                  </div>
                  <div className="flex-1 flex items-center gap-2">
                    <label className="text-sm whitespace-nowrap"><span className="text-red-500 mr-1">*</span>作业目的：</label>
                    <select value={purpose} onChange={e => setPurpose(e.target.value)} className="flex-1 h-full border border-gray-300 rounded px-2 text-sm">
                      <option>增雨（雪）</option>
                      <option>防雹</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center h-8">
                      <label className="w-24 text-sm font-medium"><span className="text-red-500 mr-1">*</span>作业地区：</label>
                      <select value={region} onChange={e => setRegion(e.target.value)} className="flex-1 h-full border border-gray-300 rounded px-2 text-sm focus:border-[#3A96FF] outline-none">
                        <option>全国</option>
                        <option>华北地区</option>
                        <option>东北地区</option>
                        <option>西南地区</option>
                      </select>
                    </div>

                    <div className="flex items-center h-8">
                      <label className="w-24 text-sm font-medium">服务领域：</label>
                      <select value={serviceArea} onChange={e => setServiceArea(e.target.value)} className="flex-1 h-full border border-gray-300 rounded px-2 text-sm focus:border-[#3A96FF] outline-none">
                        <option>请选择</option>
                        <option>农业生产</option>
                        <option>森林防火</option>
                        <option>生态修复</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="w-48 h-20 bg-gray-100 rounded border border-gray-200 flex flex-col items-center justify-center relative overflow-hidden group/map">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=400&auto=format&fit=crop')] bg-cover bg-center"></div>
                    <MapPin size={16} className="text-[#3A96FF] mb-1 z-10" />
                    <span className="text-[10px] text-gray-500 z-10">点击选择作业区域</span>
                    <div className="absolute inset-0 bg-[#3A96FF]/10 opacity-0 group-hover/map:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                      <Search size={14} className="text-[#3A96FF]" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center h-8">
                  <label className="w-24 text-sm font-medium"><span className="text-red-500 mr-1">*</span>子标题：</label>
                  <input 
                    type="text" 
                    value={subSubtitle} 
                    onChange={e => setSubSubtitle(e.target.value)}
                    className="flex-1 h-full border border-gray-300 rounded px-2 text-sm focus:outline-none focus:border-[#3A96FF]" 
                  />
                </div>

                <div className="flex items-center h-8 gap-4">
                  <div className="flex items-center gap-2">
                    <label className="w-24 text-sm font-medium">制作者：</label>
                    <select value={maker} onChange={e => setMaker(e.target.value)} className="w-32 h-full border border-gray-300 rounded px-2 text-sm">
                      <option value="">请选择</option>
                      {personOptions.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">审核人：</span>
                    <select value={auditor} onChange={e => setAuditor(e.target.value)} className="w-32 h-full border border-gray-300 rounded px-2 text-sm">
                      <option value="">请选择</option>
                      {auditorOptions.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">签发人：</span>
                    <select value={signer} onChange={e => setSigner(e.target.value)} className="w-32 h-full border border-gray-300 rounded px-2 text-sm">
                      <option value="">请选择</option>
                      {signerOptions.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                </div>

                {/* Section One: Need Focus */}
                <div className="mt-8">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-1 mb-3">
                    <span className="text-sm font-bold">一、需求重点:</span>
                    <div className="flex gap-2">
                      <button onClick={() => addItem('need', 'text')} className="flex items-center gap-1 px-2 py-1 bg-[#F0F5FF] text-[#3A96FF] border border-gray-200 rounded text-[11px] hover:bg-blue-100 transition-colors">
                        <Plus size={12} /> 添加内容
                      </button>
                      <button onClick={() => addItem('need', 'image')} className="flex items-center gap-1 px-2 py-1 bg-[#F0F5FF] text-[#3A96FF] border border-gray-200 rounded text-[11px] hover:bg-blue-100 transition-colors">
                        <ImageIcon size={12} /> 添加图片
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <AnimatePresence>
                      {needItems.map(item => (
                        <motion.div 
                          key={item.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="relative group bg-[#FAFAFA] border border-gray-200 rounded p-3"
                        >
                          <button 
                            onClick={() => removeItem('need', item.id)}
                            className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 size={16} />
                          </button>
                          
                          {item.type === 'text' ? (
                            <textarea 
                              value={item.content}
                              onChange={e => updateItem('need', item.id, 'content', e.target.value)}
                              placeholder="请输入需求重点内容..."
                              className="w-full min-h-[80px] bg-transparent text-sm leading-relaxed focus:outline-none resize-none"
                            />
                          ) : (
                            <div className="space-y-3">
                              <div className="flex gap-4">
                                {item.images?.map((img, idx) => (
                                  <div 
                                    key={idx} 
                                    onClick={() => handleImageUpload('need', item.id, idx)}
                                    className="w-44 h-36 border border-dashed border-gray-300 rounded flex flex-col items-center justify-center bg-white cursor-pointer hover:border-[#3A96FF] hover:bg-blue-50 transition-all overflow-hidden relative group/img"
                                  >
                                    {img ? (
                                      <img src={img} alt="Upload" className="w-full h-full object-cover" />
                                    ) : (
                                      <>
                                        <Download size={24} className="text-gray-300 mb-2" />
                                        <span className="text-xs text-gray-400">上传图片</span>
                                      </>
                                    )}
                                    {img && (
                                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                                        <ImageIcon size={20} className="text-white" />
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                              <input 
                                type="text" 
                                value={item.caption}
                                onChange={e => updateItem('need', item.id, 'caption', e.target.value)}
                                className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-[#3A96FF] focus:border-[#3A96FF] outline-none"
                                placeholder="请输入图注..."
                              />
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Section Two: Operation Prospect */}
                <div className="mt-8">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-1 mb-3">
                    <span className="text-sm font-bold">二、作业展望:</span>
                    <div className="flex gap-2">
                      <button onClick={() => addItem('prospect', 'text')} className="flex items-center gap-1 px-2 py-1 bg-[#F0F5FF] text-[#3A96FF] border border-gray-200 rounded text-[11px] hover:bg-blue-100 transition-colors">
                        <Plus size={12} /> 添加内容
                      </button>
                      <button onClick={() => addItem('prospect', 'image')} className="flex items-center gap-1 px-2 py-1 bg-[#F0F5FF] text-[#3A96FF] border border-gray-200 rounded text-[11px] hover:bg-blue-100 transition-colors">
                        <ImageIcon size={12} /> 添加图片
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <AnimatePresence>
                      {prospectItems.map(item => (
                        <motion.div 
                          key={item.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="relative group bg-[#FAFAFA] border border-gray-200 rounded p-3"
                        >
                          <button 
                            onClick={() => removeItem('prospect', item.id)}
                            className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 size={16} />
                          </button>
                          
                          {item.type === 'text' ? (
                            <textarea 
                              value={item.content}
                              onChange={e => updateItem('prospect', item.id, 'content', e.target.value)}
                              placeholder="请输入作业展望内容..."
                              className="w-full min-h-[80px] bg-transparent text-sm leading-relaxed focus:outline-none resize-none"
                            />
                          ) : (
                            <div className="space-y-3">
                              <div className="flex gap-4">
                                {item.images?.map((img, idx) => (
                                  <div 
                                    key={idx} 
                                    onClick={() => handleImageUpload('prospect', item.id, idx)}
                                    className="w-44 h-36 border border-dashed border-gray-300 rounded flex flex-col items-center justify-center bg-white cursor-pointer hover:border-[#3A96FF] hover:bg-blue-50 transition-all overflow-hidden relative group/img"
                                  >
                                    {img ? (
                                      <img src={img} alt="Upload" className="w-full h-full object-cover" />
                                    ) : (
                                      <>
                                        <Download size={24} className="text-gray-300 mb-2" />
                                        <span className="text-xs text-gray-400">上传图片</span>
                                      </>
                                    )}
                                    <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover/img:opacity-100 transition-opacity">
                                      <button className="p-1 bg-white/90 rounded shadow hover:bg-white"><BarChart3 size={12} className="text-[#3A96FF]" /></button>
                                      <button className="p-1 bg-white/90 rounded shadow hover:bg-white"><Download size={12} className="text-[#3A96FF]" /></button>
                                      <button className="p-1 bg-white/90 rounded shadow hover:bg-white"><Plus size={12} className="text-[#3A96FF]" /></button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <input 
                                type="text" 
                                value={item.caption}
                                onChange={e => updateItem('prospect', item.id, 'caption', e.target.value)}
                                className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-[#3A96FF] focus:border-[#3A96FF] outline-none"
                                placeholder="请输入图注..."
                              />
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="h-16 border-t border-gray-100 px-5 flex items-center justify-end gap-3 bg-white">
              <button className="px-5 py-2 bg-[#3A96FF] text-white rounded text-sm font-medium hover:bg-blue-600 transition-colors shadow-sm">提交</button>
              <button className="px-5 py-2 bg-[#F0F5FF] text-[#3A96FF] border border-[#3A96FF] rounded text-sm font-medium hover:bg-blue-50 transition-colors">保存草稿</button>
              <button className="px-5 py-2 border border-gray-300 rounded text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">取消</button>
            </div>
          </main>

          {/* Preview Panel (Right) - 4.5 Ratio */}
          <aside className="flex-[4.5] bg-[#E9F1FF] rounded shadow-lg flex flex-col overflow-hidden border border-gray-100">
            {/* Preview Header */}
            <div className="h-12 bg-[#D0E1FF] px-4 flex items-center justify-between border-b border-[#B8D4FF]">
              <h3 className="text-[#3A96FF] font-bold text-sm">查看预览</h3>
              <div className="flex items-center gap-2">
                <button className="p-1.5 bg-white rounded text-[#3A96FF] shadow-sm hover:bg-blue-50 transition-colors" title="下载">
                  <Download size={16} />
                </button>
                <button className="p-1.5 bg-white rounded text-[#3A96FF] shadow-sm hover:bg-blue-50 transition-colors" title="收藏夹">
                  <Star size={16} />
                </button>
              </div>
            </div>

            {/* Preview Content Area */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center bg-[#f0f4f8]">
              <div className="w-full max-w-[600px] bg-white shadow-2xl min-h-[850px] flex flex-col relative overflow-hidden rounded-sm border border-gray-200">
                {isGenerating ? (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                    <div className="w-12 h-12 border-4 border-[#3A96FF] border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-[#3A96FF] font-medium animate-pulse">正在生成高保真预览...</p>
                  </div>
                ) : null}

                {showPreview ? (
                  <div className="flex flex-col h-full animate-in fade-in zoom-in-95 duration-700">
                    <div className="p-8 flex flex-col h-full">
                      {/* Mock Report Header */}
                      <div className="border-b-2 border-red-600 pb-4 mb-6 text-center">
                        <h1 className="text-3xl font-serif font-bold text-red-600 tracking-widest mb-2">人影作业展望</h1>
                        <div className="flex justify-between text-sm text-gray-600 font-medium">
                          <span>{makeUnit}</span>
                          <span>{periodDesc}</span>
                        </div>
                      </div>

                      <div className="text-center mb-8">
                        <h2 className="text-xl font-bold mb-1">{title}</h2>
                        {subtitle && <h3 className="text-lg text-gray-700">{subtitle}</h3>}
                        <div className="text-sm text-gray-500 mt-2">签发：{signer}</div>
                      </div>

                      <div className="space-y-6 text-sm leading-relaxed text-justify">
                        <div>
                          <h4 className="font-bold text-base mb-2">一、需求重点</h4>
                          {needItems.filter(i => i.type === 'text').map(i => <p key={i.id} className="mb-2 indent-8">{i.content}</p>)}
                        </div>

                        <div>
                          <h4 className="font-bold text-base mb-2">二、作业展望</h4>
                          {prospectItems.filter(i => i.type === 'text').map(i => <p key={i.id} className="mb-2 indent-8">{i.content}</p>)}
                          
                          <div className="my-6 flex flex-col items-center">
                            <img 
                              src="https://images.unsplash.com/photo-1592210633466-3b8bd145bdf2?q=80&w=600&auto=format&fit=crop" 
                              alt="Weather Map" 
                              className="w-full rounded shadow-sm border border-gray-100"
                            />
                            <p className="text-xs text-gray-500 mt-2 italic">图1 未来一周人影作业展望</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-auto pt-8 border-t border-gray-100 flex justify-between text-xs text-gray-400">
                        <span>制作：{maker || '系统生成'}</span>
                        <span>审核：{auditor || '待审核'}</span>
                        <span>时间：{new Date(makeTime).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-10 text-center">
                    <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
                      <FileVideo size={40} className="text-[#3A96FF] opacity-50" />
                    </div>
                    <h4 className="text-gray-600 font-medium mb-2">暂无预览内容</h4>
                    <p className="text-xs max-w-[200px] leading-relaxed">请在左侧填写报告信息后，点击下方“预览”按钮生成高保真报告</p>
                  </div>
                )}
              </div>
            </div>

            {/* Preview Footer */}
            <div className="h-20 bg-white border-t border-gray-100 flex items-center justify-center px-6">
              <button 
                onClick={handlePreview}
                disabled={isGenerating}
                className={`w-full max-w-[280px] py-3 bg-[#3A96FF] text-white rounded-lg text-sm font-bold hover:bg-blue-600 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 ${isGenerating ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isGenerating ? <RefreshCw size={18} className="animate-spin" /> : <Play size={18} fill="currentColor" />}
                预览
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

