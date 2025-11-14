
// All translations are now embedded directly in this file to avoid JSON import issues.

const en = {
  "header": { "title": "Earth Observation Browser", "subtitle": "Browse and visualize satellite imagery and geospatial data." },
  "serviceSelector": { "title": "Choose a service", "currentServiceLabel": "Current Service", "noneSelected": "No service selected", "sortBy": "Sort by: {mode}", "sortMode": { "custom": "Custom", "ranking": "Ranking" }, "rankingLabel": "RANKING", "reset": "Reset", "selectable": "Selectable", "disabled": "Disabled", "edit": "Edit", "delete": "Delete", "clone": "Clone", "clonePrefix": "Copy of ", "lockService": "Lock service", "unlockService": "Unlock service" },
  "filterPanel": { "title": "Filter Services", "typeLabel": "Type", "statusLabel": "Status", "lockLabel": "Lock Status", "rankingLabel": "Max Ranking", "rankingPlaceholder": "e.g., 5", "typeOptions": { "all": "All", "free": "Free", "paid": "Paid" }, "statusOptions": { "all": "All", "selectable": "Selectable", "disabled": "Disabled" }, "lockOptions": { "all": "All", "locked": "Locked", "unlocked": "Unlocked" }, "protocolLabel": "Protocol", "protocolOptions": { "all": "All" }, "clearButton": "Clear Filters" },
  "addServiceForm": { "title": "Add Custom Service", "nameLabel": "Service Name", "urlLabel": "Service URL", "descriptionLabel": "Description / Tagline", "queryLabel": "Default Query (optional)", "typeLabel": "Service Type", "protocolLabel": "Protocol", "protocolOData": "OData", "protocolREST": "REST", "free": "Free", "paid": "Paid", "addButton": "Add Service", "namePlaceholder": "My Custom Service", "urlPlaceholder": "https://example.com/odata/v1/", "descriptionPlaceholder": "A short description of the service.", "queryPlaceholder": "Items?$top=10", "urlExistsError": "A service with this URL already exists." },
  "editServiceModal": { "title": "Edit Service", "save": "Save Changes", "cancel": "Cancel" },
  "deleteModal": { "title": "Confirm Deletion", "message": "Are you sure you want to delete the service '{serviceName}'? This action cannot be undone for the current session.", "confirm": "Delete", "cancel": "Cancel" },
  "clearSettingsModal": { "title": "Delete Saved Settings", "message": "Are you sure you want to permanently delete your saved settings from this browser? This action cannot be undone.", "confirm": "Delete", "cancel": "Cancel" },
  "presets": { "s5p": { "name": "Copernicus Sentinel-5P Hub", "description": "Access atmospheric data from the Sentinel-5P satellite, monitoring air quality, ozone, and more." }, "s3": { "name": "Copernicus Sentinel-3 Hub", "description": "Access Sentinel-3 data for ocean color, temperature, and land surface monitoring." }, "tripPin": { "name": "OData TripPin Service", "description": "A sample service with a trip management model, including people, airlines, and airports." }, "northwind": { "name": "Northwind OData Service", "description": "Classic database sample containing customers, orders, products, and suppliers." } },
  "divider": "Or",
  "apiForm": { "urlLabel": "OData Service URL", "queryLabel": "Resource Path / Query", "fetch": "Fetch Data", "fetching": "Fetching..." },
  "results": { "loading": "Loading data...", "placeholder": "Results will be displayed here once you fetch data.", "noData": "No data to display.", "jsonResponse": "JSON Response", "translating": "Translating..." },
  "error": { "http": "HTTP error! Status: {status}", "network": "A network or validation error occurred.", "unknown": "An unknown error occurred.", "invalidUrl": "Please enter a valid OData Service URL starting with http or https.", "importFailed": "Failed to import settings. The file may be invalid or corrupted." },
  "errorModal": { "title": "Request Failed", "defaultSummary": "An unexpected error occurred.", "acknowledge": "Acknowledge", "details": "Details...", "hideDetails": "Hide Details" },
  "languageSwitcher": { "label": "Language" },
  "settings": { "save": "Save settings", "restore": "Restore settings", "reset": "Reset to default", "clearSaved": "Clear Saved", "export": "Export", "import": "Import" }
};

const fr = {
  "header": { "title": "Navigateur d'Observation de la Terre", "subtitle": "Parcourez et visualisez des images satellite et des données géospatiales." },
  "serviceSelector": { "title": "Choisissez un service", "currentServiceLabel": "Service Actuel", "noneSelected": "Aucun service sélectionné", "sortBy": "Trier par : {mode}", "sortMode": { "custom": "Personnalisé", "ranking": "Classement" }, "rankingLabel": "CLASSEMENT", "reset": "Réinitialiser", "selectable": "Sélectionnable", "disabled": "Désactivé", "edit": "Modifier", "delete": "Supprimer", "clone": "Cloner", "clonePrefix": "Copie de ", "lockService": "Verrouiller le service", "unlockService": "Déverrouiller le service" },
  "filterPanel": { "title": "Filtrer les Services", "typeLabel": "Type", "statusLabel": "Statut", "lockLabel": "Statut de Verrouillage", "rankingLabel": "Classement Max", "rankingPlaceholder": "ex : 5", "typeOptions": { "all": "Tous", "free": "Gratuit", "paid": "Payant" }, "statusOptions": { "all": "Tous", "selectable": "Sélectionnable", "disabled": "Désactivé" }, "lockOptions": { "all": "Tous", "locked": "Verrouillé", "unlocked": "Déverrouillé" }, "protocolLabel": "Protocole", "protocolOptions": { "all": "Tous" }, "clearButton": "Effacer les Filtres" },
  "addServiceForm": { "title": "Ajouter un Service Personnalisé", "nameLabel": "Nom du Service", "urlLabel": "URL du Service", "descriptionLabel": "Description / Slogan", "queryLabel": "Requête par Défaut (optionnel)", "typeLabel": "Type de Service", "protocolLabel": "Protocole", "protocolOData": "OData", "protocolREST": "REST", "free": "Gratuit", "paid": "Payant", "addButton": "Ajouter le Service", "namePlaceholder": "Mon Service Personnalisé", "urlPlaceholder": "https://example.com/odata/v1/", "descriptionPlaceholder": "Une courte description du service.", "queryPlaceholder": "Items?$top=10", "urlExistsError": "Un service avec cette URL existe déjà." },
  "editServiceModal": { "title": "Modifier le Service", "save": "Enregistrer les modifications", "cancel": "Annuler" },
  "deleteModal": { "title": "Confirmer la Suppression", "message": "Êtes-vous sûr de vouloir supprimer le service '{serviceName}' ? Cette action est irréversible pour la session en cours.", "confirm": "Supprimer", "cancel": "Annuler" },
  "clearSettingsModal": { "title": "Supprimer les paramètres sauvegardés", "message": "Êtes-vous sûr de vouloir supprimer définitivement vos paramètres sauvegardés de ce navigateur ? Cette action est irréversible.", "confirm": "Supprimer", "cancel": "Annuler" },
  "presets": { "s5p": { "name": "Hub Copernicus Sentinel-5P", "description": "Accédez aux données atmosphériques du satellite Sentinel-5P, surveillant la qualité de l'air, l'ozone, et plus encore." }, "s3": { "name": "Hub Copernicus Sentinel-3", "description": "Accédez aux données de Sentinel-3 pour la couleur de l'océan, la température et la surveillance de la surface terrestre." }, "tripPin": { "name": "Service OData TripPin", "description": "Un service d'exemple avec un modèle de gestion de voyages, incluant des personnes, des compagnies aériennes et des aéroports." }, "northwind": { "name": "Service OData Northwind", "description": "Exemple de base de données classique contenant des clients, des commandes, des produits et des fournisseurs." } },
  "divider": "Ou",
  "apiForm": { "urlLabel": "URL du Service OData", "queryLabel": "Chemin de Ressource / Requête", "fetch": "Récupérer les Données", "fetching": "Récupération..." },
  "results": { "loading": "Chargement des données...", "placeholder": "Les résultats s'afficheront ici une fois les données récupérées.", "noData": "Aucune donnée à afficher.", "jsonResponse": "Réponse JSON", "translating": "Traduction..." },
  "error": { "http": "Erreur HTTP ! Statut : {status}", "network": "Une erreur de réseau ou de validation est survenue.", "unknown": "Une erreur inconnue est survenue.", "invalidUrl": "Veuillez saisir une URL de service OData valide commençant par http ou https.", "importFailed": "Échec de l'importation des paramètres. Le fichier est peut-être invalide ou corrompu." },
  "errorModal": { "title": "La Requête a Échoué", "defaultSummary": "Une erreur inattendue est survenue.", "acknowledge": "Accepter", "details": "Détails...", "hideDetails": "Masquer les Détails" },
  "languageSwitcher": { "label": "Langue" },
  "settings": { "save": "Sauvegarder les paramètres", "restore": "Restaurer les paramètres", "reset": "Réinitialiser", "clearSaved": "Effacer la Sauvegarde", "export": "Exporter", "import": "Importer" }
};

const it = {
  "header": { "title": "Browser di Osservazione della Terra", "subtitle": "Sfoglia e visualizza immagini satellitari e dati geospaziali." },
  "serviceSelector": { "title": "Scegli un servizio", "currentServiceLabel": "Servizio Attuale", "noneSelected": "Nessun servizio selezionato", "sortBy": "Ordina per: {mode}", "sortMode": { "custom": "Personalizzato", "ranking": "Classifica" }, "rankingLabel": "CLASSIFICA", "reset": "Reimposta", "selectable": "Selezionabile", "disabled": "Disabilitato", "edit": "Modifica", "delete": "Elimina", "clone": "Clona", "clonePrefix": "Copia di ", "lockService": "Blocca servizio", "unlockService": "Sblocca servizio" },
  "filterPanel": { "title": "Filtra Servizi", "typeLabel": "Tipo", "statusLabel": "Stato", "lockLabel": "Stato Blocco", "rankingLabel": "Classifica Max", "rankingPlaceholder": "es: 5", "typeOptions": { "all": "Tutti", "free": "Gratuito", "paid": "A pagamento" }, "statusOptions": { "all": "Tutti", "selectable": "Selezionabile", "disabled": "Disabilitato" }, "lockOptions": { "all": "Tutti", "locked": "Bloccato", "unlocked": "Sbloccato" }, "protocolLabel": "Protocollo", "protocolOptions": { "all": "Tutti" }, "clearButton": "Pulisci Filtri" },
  "addServiceForm": { "title": "Aggiungi Servizio Personalizzato", "nameLabel": "Nome Servizio", "urlLabel": "URL Servizio", "descriptionLabel": "Descrizione / Tagline", "queryLabel": "Query Predefinita (opzionale)", "typeLabel": "Tipo di Servizio", "protocolLabel": "Protocollo", "protocolOData": "OData", "protocolREST": "REST", "free": "Gratuito", "paid": "A pagamento", "addButton": "Aggiungi Servizio", "namePlaceholder": "Mio Servizio Personalizzato", "urlPlaceholder": "https://example.com/odata/v1/", "descriptionPlaceholder": "Una breve descrizione del servizio.", "queryPlaceholder": "Items?$top=10", "urlExistsError": "Un servizio con questo URL esiste già." },
  "editServiceModal": { "title": "Modifica Servizio", "save": "Salva Modifiche", "cancel": "Annulla" },
  "deleteModal": { "title": "Conferma Eliminazione", "message": "Sei sicuro di voler eliminare il servizio '{serviceName}'? Questa azione non può essere annullata per la sessione corrente.", "confirm": "Elimina", "cancel": "Annulla" },
  "clearSettingsModal": { "title": "Elimina Impostazioni Salvate", "message": "Sei sicuro di voler eliminare in modo permanente le tue impostazioni salvate da questo browser? L'azione non può essere annullata.", "confirm": "Elimina", "cancel": "Annulla" },
  "presets": { "s5p": { "name": "Hub Copernicus Sentinel-5P", "description": "Accedi ai dati atmosferici del satellite Sentinel-5P, monitorando la qualità dell'aria, l'ozono e altro." }, "s3": { "name": "Hub Copernicus Sentinel-3", "description": "Accedi ai dati di Sentinel-3 per il colore degli oceani, la temperatura e il monitoraggio della superficie terrestre." }, "tripPin": { "name": "Servizio OData TripPin", "description": "Un servizio di esempio con un modello di gestione dei viaggi, che include persone, compagnie aeree e aeroporti." }, "northwind": { "name": "Servizio OData Northwind", "description": "Classico esempio di database contenente clienti, ordini, prodotti e fornitori." } },
  "divider": "O",
  "apiForm": { "urlLabel": "URL del Servizio OData", "queryLabel": "Percorso Risorsa / Query", "fetch": "Recupera Dati", "fetching": "Recupero..." },
  "results": { "loading": "Caricamento dati...", "placeholder": "I risultati verranno visualizzati qui una volta recuperati i dati.", "noData": "Nessun dato da visualizzare.", "jsonResponse": "Risposta JSON", "translating": "Traduzione in corso..." },
  "error": { "http": "Errore HTTP! Stato: {status}", "network": "Si è verificato un errore di rete o di convalida.", "unknown": "Si è verificato un errore sconosciuto.", "invalidUrl": "Inserisci un URL del servizio OData valido che inizi con http o https.", "importFailed": "Importazione delle impostazioni non riuscita. Il file potrebbe essere non valido o corrotto." },
  "errorModal": { "title": "Richiesta Fallita", "defaultSummary": "Si è verificato un errore imprevisto.", "acknowledge": "Conferma", "details": "Dettagli...", "hideDetails": "Nascondi Dettagli" },
  "languageSwitcher": { "label": "Lingua" },
  "settings": { "save": "Salva impostazioni", "restore": "Ripristina impostazioni", "reset": "Ripristina predefiniti", "clearSaved": "Cancella Salvataggio", "export": "Esporta", "import": "Importa" }
};

const zh = {
  "header": { "title": "地球观测浏览器", "subtitle": "浏览和可视化卫星图像和地理空间数据。" },
  "serviceSelector": { "title": "选择一个服务", "currentServiceLabel": "当前服务", "noneSelected": "未选择服务", "sortBy": "排序方式：{mode}", "sortMode": { "custom": "自定义", "ranking": "排名" }, "rankingLabel": "排名", "reset": "重置", "selectable": "可选", "disabled": "已禁用", "edit": "编辑", "delete": "删除", "clone": "克隆", "clonePrefix": "的副本", "lockService": "锁定服务", "unlockService": "解锁服务" },
  "filterPanel": { "title": "筛选服务", "typeLabel": "类型", "statusLabel": "状态", "lockLabel": "锁定状态", "rankingLabel": "最高排名", "rankingPlaceholder": "例如 5", "typeOptions": { "all": "全部", "free": "免费", "paid": "付费" }, "statusOptions": { "all": "全部", "selectable": "可选", "disabled": "已禁用" }, "lockOptions": { "all": "全部", "locked": "已锁定", "unlocked": "未锁定" }, "protocolLabel": "协议", "protocolOptions": { "all": "全部" }, "clearButton": "清除筛选" },
  "addServiceForm": { "title": "添加自定义服务", "nameLabel": "服务名称", "urlLabel": "服务 URL", "descriptionLabel": "描述 / 标语", "queryLabel": "默认查询 (可选)", "typeLabel": "服务类型", "protocolLabel": "协议", "protocolOData": "OData", "protocolREST": "REST", "free": "免费", "paid": "付费", "addButton": "添加服务", "namePlaceholder": "我的自定义服务", "urlPlaceholder": "https://example.com/odata/v1/", "descriptionPlaceholder": "服务的简短描述。", "queryPlaceholder": "Items?$top=10", "urlExistsError": "具有此 URL 的服务已存在。" },
  "editServiceModal": { "title": "编辑服务", "save": "保存更改", "cancel": "取消" },
  "deleteModal": { "title": "确认删除", "message": "您确定要删除服务“{serviceName}”吗？此操作在当前会话中无法撤消。", "confirm": "删除", "cancel": "取消" },
  "clearSettingsModal": { "title": "删除已存设置", "message": "您确定要从此浏览器中永久删除您保存的设置吗？此操作无法撤销。", "confirm": "删除", "cancel": "取消" },
  "presets": { "s5p": { "name": "哥白尼 Sentinel-5P 中心", "description": "访问 Sentinel-5P 卫星的大气数据，监测空气质量、臭氧等。" }, "s3": { "name": "哥白尼 Sentinel-3 中心", "description": "访问 Sentinel-3 的海洋颜色、温度和陆地表面监测数据。" }, "tripPin": { "name": "OData TripPin 服务", "description": "一个包含旅行管理模型的示例服务，包括人员、航空公司和机场。" }, "northwind": { "name": "OData Northwind 服务", "description": "经典的数据库示例，包含客户、订单、产品和供应商。" } },
  "divider": "或",
  "apiForm": { "urlLabel": "OData 服务 URL", "queryLabel": "资源路径 / 查询", "fetch": "获取数据", "fetching": "获取中..." },
  "results": { "loading": "正在加载数据...", "placeholder": "获取数据后，结果将在此处显示。", "noData": "无数据显示。", "jsonResponse": "JSON 响应", "translating": "翻译中..." },
  "error": { "http": "HTTP 错误！状态：{status}", "network": "发生网络或验证错误。", "unknown": "发生未知错误。", "invalidUrl": "请输入以 http 或 https 开头的有效 OData 服务 URL。", "importFailed": "导入设置失败。文件可能无效或已损坏。" },
  "errorModal": { "title": "请求失败", "defaultSummary": "发生意外错误。", "acknowledge": "确认", "details": "详情...", "hideDetails": "隐藏详情" },
  "languageSwitcher": { "label": "语言" },
  "settings": { "save": "保存设置", "restore": "恢复设置", "reset": "重置为默认", "clearSaved": "清除已存设置", "export": "导出", "import": "导入" }
};

const ja = {
  "header": { "title": "地球観測ブラウザ", "subtitle": "衛星画像と地理空間データを閲覧・視覚化します。" },
  "serviceSelector": { "title": "サービスを選択", "currentServiceLabel": "現在のサービス", "noneSelected": "サービスが選択されていません", "sortBy": "並び替え: {mode}", "sortMode": { "custom": "カスタム", "ranking": "ランキング" }, "rankingLabel": "ランキング", "reset": "リセット", "selectable": "選択可能", "disabled": "無効", "edit": "編集", "delete": "削除", "clone": "複製", "clonePrefix": "のコピー", "lockService": "サービスをロック", "unlockService": "サービスのロックを解除" },
  "filterPanel": { "title": "サービスをフィルター", "typeLabel": "タイプ", "statusLabel": "ステータス", "lockLabel": "ロック状態", "rankingLabel": "最大ランキング", "rankingPlaceholder": "例: 5", "typeOptions": { "all": "すべて", "free": "無料", "paid": "有料" }, "statusOptions": { "all": "すべて", "selectable": "選択可能", "disabled": "無効" }, "lockOptions": { "all": "すべて", "locked": "ロック済み", "unlocked": "ロック解除済み" }, "protocolLabel": "プロトコル", "protocolOptions": { "all": "すべて" }, "clearButton": "フィルターをクリア" },
  "addServiceForm": { "title": "カスタムサービスを追加", "nameLabel": "サービス名", "urlLabel": "サービスURL", "descriptionLabel": "説明 / タグライン", "queryLabel": "デフォルトクエリ (任意)", "typeLabel": "サービスタイプ", "protocolLabel": "プロトコル", "protocolOData": "OData", "protocolREST": "REST", "free": "無料", "paid": "有料", "addButton": "サービスを追加", "namePlaceholder": "私のカスタムサービス", "urlPlaceholder": "https://example.com/odata/v1/", "descriptionPlaceholder": "サービスの簡単な説明。", "queryPlaceholder": "Items?$top=10", "urlExistsError": "このURLのサービスはすでに存在します。" },
  "editServiceModal": { "title": "サービスを編集", "save": "変更を保存", "cancel": "キャンセル" },
  "deleteModal": { "title": "削除の確認", "message": "サービス「{serviceName}」を削除してもよろしいですか？この操作は現在のセッションでは元に戻せません。", "confirm": "削除", "cancel": "キャンセル" },
  "clearSettingsModal": { "title": "保存された設定を削除", "message": "このブラウザから保存した設定を完全に削除してもよろしいですか？この操作は元に戻せません。", "confirm": "削除", "cancel": "キャンセル" },
  "presets": { "s5p": { "name": "コペルニクス Sentinel-5P ハブ", "description": "Sentinel-5P衛星からの大気データにアクセスし、空気質、オゾンなどを監視します。" }, "s3": { "name": "コペルニクス Sentinel-3 ハブ", "description": "海洋の色、温度、陸地の表面監視のためのSentinel-3データにアクセスします。" }, "tripPin": { "name": "OData TripPin サービス", "description": "人物、航空会社、空港を含む旅行管理モデルのサンプルサービスです。" }, "northwind": { "name": "OData Northwind サービス", "description": "顧客、注文、製品、サプライヤーを含むクラシックなデータベースサンプルです。" } },
  "divider": "または",
  "apiForm": { "urlLabel": "OData サービス URL", "queryLabel": "リソースパス / クエリ", "fetch": "データを取得", "fetching": "取得中..." },
  "results": { "loading": "データを読み込み中...", "placeholder": "データを取得すると、結果がここに表示されます。", "noData": "表示するデータがありません。", "jsonResponse": "JSON レスポンス", "translating": "翻訳中..." },
  "error": { "http": "HTTPエラー！ステータス: {status}", "network": "ネットワークまたは検証エラーが発生しました。", "unknown": "不明なエラーが発生しました。", "invalidUrl": "httpまたはhttpsで始まる有効なODataサービスURLを入力してください。", "importFailed": "設定のインポートに失敗しました。ファイルが無効か破損している可能性があります。" },
  "errorModal": { "title": "リクエストに失敗しました", "defaultSummary": "予期せぬエラーが発生しました。", "acknowledge": "承認", "details": "詳細...", "hideDetails": "詳細を隠す" },
  "languageSwitcher": { "label": "言語" },
  "settings": { "save": "設定を保存", "restore": "設定を復元", "reset": "デフォルトにリセット", "clearSaved": "保存データを削除", "export": "エクスポート", "import": "インポート" }
};

type Translations = typeof en;

const translations: Record<string, Translations> = { en, fr, it, zh, ja };

const getNestedValue = (obj: any, path: string): unknown => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

export const getTranslator = (language: string) => {
  const langFile = translations[language] || translations.en;
  const fallbackLangFile = translations.en;

  return (key: string, replacements?: Record<string, string>): string => {
    // Attempt to get the value from the selected language
    let value = getNestedValue(langFile, key);

    // If it's not a string (e.g., it's an object because the key is partial, or undefined), try the fallback language
    if (typeof value !== 'string') {
      value = getNestedValue(fallbackLangFile, key);
    }

    // If it's still not a string, return the key itself as a safe fallback to prevent crashes
    if (typeof value !== 'string') {
      return key;
    }
    
    // Now we are sure value is a string, proceed with replacements
    let translation = value;
    if (replacements) {
        Object.keys(replacements).forEach(placeholder => {
            translation = translation.replace(`{${placeholder}}`, replacements[placeholder]);
        });
    }
    return translation;
  };
};

export const supportedLanguages = {
  en: { name: 'English', flag: 'gb' },
  fr: { name: 'Français', flag: 'fr' },
  it: { name: 'Italiano', flag: 'it' },
  zh: { name: '中文', flag: 'cn' },
  ja: { name: '日本語', flag: 'jp' },
};
