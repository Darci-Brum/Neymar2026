const SUPABASE_TABLES = [
  'neymar_profile',
  'neymar_totals',
  'neymar_goal_types',
  'neymar_club_passages',
  'neymar_national_teams',
  'neymar_collective_titles',
  'neymar_individual_awards',
  'neymar_important_goals',
  'neymar_opponents',
  'neymar_gallery',
  'neymar_sources'
];

const SupabaseStore = {
  status: {
    connected: false,
    mode: 'local',
    message: 'Usando dados locais do arquivo js/data.js.',
    loadedTables: []
  },

  get restUrl(){
    return (window.SUPABASE_CONFIG?.restUrl || '').replace(/\/$/, '');
  },

  get apiKey(){
    return window.SUPABASE_CONFIG?.apiKey || '';
  },

  isConfigured(){
    return Boolean(this.restUrl && this.apiKey && this.restUrl.includes('/rest/v1'));
  },

  async request(table, options = {}){
    if(!this.isConfigured()) throw new Error('Supabase não configurado.');
    const query = options.query || 'select=*';
    const url = `${this.restUrl}/${table}?${query}`;
    const response = await fetch(url, {
      method: options.method || 'GET',
      headers: {
        apikey: this.apiKey,
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        Prefer: options.prefer || 'return=representation'
      },
      body: options.body ? JSON.stringify(options.body) : undefined
    });
    if(!response.ok){
      const errorText = await response.text().catch(() => '');
      throw new Error(`${table}: ${response.status} ${errorText}`);
    }
    if(response.status === 204) return [];
    return response.json();
  },

  async table(table, query = 'select=*&order=sort_order.asc'){
    return this.request(table, { query });
  },

  async safeTable(table, query){
    try{
      const rows = await this.table(table, query);
      if(Array.isArray(rows) && rows.length) this.status.loadedTables.push(table);
      return Array.isArray(rows) ? rows : [];
    }catch(error){
      console.warn(`[Supabase] ${table} indisponível:`, error.message);
      return [];
    }
  },

  async loadSiteData(fallback){
    if(!this.isConfigured()){
      this.status = { connected:false, mode:'local', message:'Supabase não configurado. Usando dados locais.', loadedTables:[] };
      return fallback;
    }

    this.status = { connected:false, mode:'local', message:'Tentando carregar dados do Supabase...', loadedTables:[] };

    const [profileRows, totals, goalTypes, clubs, national, titles, awards, importantGoals, opponents, gallery, sources] = await Promise.all([
      this.safeTable('neymar_profile', 'select=*&limit=1'),
      this.safeTable('neymar_totals'),
      this.safeTable('neymar_goal_types'),
      this.safeTable('neymar_club_passages'),
      this.safeTable('neymar_national_teams'),
      this.safeTable('neymar_collective_titles'),
      this.safeTable('neymar_individual_awards'),
      this.safeTable('neymar_important_goals'),
      this.safeTable('neymar_opponents', 'select=*&order=goals.desc,name.asc'),
      this.safeTable('neymar_gallery'),
      this.safeTable('neymar_sources')
    ]);

    const merged = typeof structuredClone === 'function' ? structuredClone(fallback) : JSON.parse(JSON.stringify(fallback));

    if(profileRows.length){
      const p = profileRows[0];
      merged.updatedAt = p.updated_at_label || merged.updatedAt;
      merged.player = {
        ...merged.player,
        name: p.name || merged.player.name,
        shortName: p.short_name || merged.player.shortName,
        birth: p.birth || merged.player.birth,
        birthplace: p.birthplace || merged.player.birthplace,
        position: p.position || merged.player.position,
        height: p.height || merged.player.height,
        dominantFoot: p.dominant_foot || merged.player.dominantFoot,
        heroImage: p.hero_image || merged.player.heroImage,
        subtitle: p.subtitle || merged.player.subtitle
      };
    }

    if(totals.length) merged.totals = totals.map(r => ({ label:r.label, value:Number(r.value), suffix:r.suffix || '', note:r.note || '' }));
    if(goalTypes.length) merged.goalTypes = goalTypes.map(r => ({ type:r.type, value:Number(r.value), source:r.source || '', description:r.description || '' }));
    if(clubs.length) merged.clubPassages = clubs.map(r => ({
      id:r.slug || r.id,
      club:r.club,
      period:r.period,
      country:r.country,
      role:r.role,
      shirt:r.shirt,
      image:r.image,
      summary:r.summary,
      stats:{ games:Number(r.games || 0), goals:Number(r.goals || 0), assists:Number(r.assists || 0), penalties:Number(r.penalties || 0), freeKicks:Number(r.free_kicks || 0) },
      highlights:r.highlights || [],
      titles:r.titles || [],
      importantGames:r.important_games || []
    }));
    if(national.length) merged.nationalTeams = national.map(r => ({ team:r.team, period:r.period, games:Number(r.games || 0), goals:Number(r.goals || 0), titles:r.titles || [], note:r.note || '' }));
    if(titles.length) merged.collectiveTitles = titles.map(r => ({ category:r.category, title:r.title, years:r.years, image:r.image }));
    if(awards.length) merged.individualAwards = awards.map(r => ({ classification:r.classification, title:r.title, years:r.years, image:r.image, detail:r.detail || '' }));
    if(importantGoals.length) merged.importantGoals = importantGoals.map(r => ({ classification:r.classification, competition:r.competition, type:r.type, opponent:r.opponent, date:r.date_label || r.date, detail:r.detail || '' }));
    if(opponents.length) merged.opponents = opponents.map(r => ({ name:r.name, category:r.category, context:r.context, goals:Number(r.goals || 0) }));
    if(gallery.length) merged.gallery = gallery.map(r => ({ title:r.title, tag:r.tag, image:r.image, credit:r.credit || '' }));
    if(sources.length) merged.sources = sources.map(r => ({ label:r.label, url:r.url }));

    const loadedCount = this.status.loadedTables.length;
    if(loadedCount){
      this.status.connected = true;
      this.status.mode = 'supabase';
      this.status.message = `Dados carregados do Supabase: ${loadedCount} tabela(s).`;
    }else{
      this.status.connected = false;
      this.status.mode = 'local';
      this.status.message = 'Não encontrei tabelas populadas no Supabase. Usando dados locais.';
    }
    return merged;
  },

  async insertFeedback(payload){
    return this.request('site_feedback', {
      method:'POST',
      body: payload,
      prefer:'return=representation'
    });
  },

  async trackPageView(page){
    try{
      await this.request('site_page_views', {
        method:'POST',
        body: {
          page,
          path: location.pathname,
          user_agent: navigator.userAgent,
          referrer: document.referrer || null
        },
        prefer:'return=minimal'
      });
    }catch(error){
      console.warn('[Supabase] Page view não enviada:', error.message);
    }
  },

  async getDashboardCounts(){
    const counts = {};
    await Promise.all(SUPABASE_TABLES.map(async table => {
      try{
        const rows = await this.request(table, { query:'select=id&limit=10000' });
        counts[table] = Array.isArray(rows) ? rows.length : 0;
      }catch(error){
        counts[table] = null;
      }
    }));
    return counts;
  }
};

window.SupabaseStore = SupabaseStore;
