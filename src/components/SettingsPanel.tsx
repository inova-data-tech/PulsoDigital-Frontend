import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Plus, X, Trash2, Edit, List, Pencil, Link as LinkIcon, Lock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SettingsPanelProps {
  className?: string;
}

// Interface para fonte com nome e URL
interface Source {
  name: string;
  url: string;
}

// Interface para representar um tópico
interface Topic {
  id: string;
  name: string;
  icon: string;
  sources: Source[];
  isDefault?: boolean; // Para identificar tópicos padrão do sistema
}

// Tópicos de exemplo para demonstração - apenas os padrão do sistema
const EXAMPLE_TOPICS: Topic[] = [
  {
    id: "t1",
    name: "Eletrônicos",
    icon: "smartphone",
    sources: [
      { name: "Amazon", url: "https://www.amazon.com.br" },
      { name: "Magazine Luiza", url: "https://www.magazineluiza.com.br" },
      { name: "Mercado Livre", url: "https://www.mercadolivre.com.br" },
      { name: "B2W", url: "https://www.americanas.com.br" }
    ],
    isDefault: true, // Tópico padrão do sistema
  },
  {
    id: "t2",
    name: "Viagens",
    icon: "flight",
    sources: [
      { name: "TripAdvisor", url: "https://www.tripadvisor.com.br" },
      { name: "Booking", url: "https://www.booking.com" },
      { name: "Decolar", url: "https://www.decolar.com" },
      { name: "Airbnb", url: "https://www.airbnb.com.br" }
    ],
    isDefault: true, // Tópico padrão do sistema
  },
  {
    id: "t3",
    name: "Alimentos",
    icon: "restaurant",
    sources: [
      { name: "iFood", url: "https://www.ifood.com.br" },
      { name: "Rappi", url: "https://www.rappi.com.br" },
      { name: "UberEats", url: "https://www.ubereats.com" }
    ],
    isDefault: true, // Tópico padrão do sistema
  }
];

const TopicCreationDialog = () => {
  const [open, setOpen] = useState(false);
  const [topicName, setTopicName] = useState("");
  const [icon, setIcon] = useState("");
  const [sourcesText, setSourcesText] = useState("");
  const [sourcesUrls, setSourcesUrls] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showIconPicker, setShowIconPicker] = useState(false);

  // Ajusta o botão padrão do Dialog após o componente montar
  useEffect(() => {
    if (open) {
      // Seleciona o botão de fechar padrão
      const closeButton = document.querySelector('[data-radix-dialog-close]');
      if (closeButton && closeButton instanceof HTMLElement) {
        // Ajustamos a posição em vez de escondê-lo
        closeButton.style.top = '16px';
        closeButton.style.right = '16px';
      }
    }
  }, [open]);

  const handleSubmit = () => {
    // Validação simples
    if (!topicName.trim()) {
      toast.error("O nome do tópico é obrigatório.");
      return;
    }
    
    // Simular processamento
    setIsSubmitting(true);
    setTimeout(() => {
      // Processar as fontes e URLs
      const sourceNames = sourcesText.split(',').map(s => s.trim()).filter(s => s);
      const urlList = sourcesUrls.split(',').map(u => u.trim()).filter(u => u);
      
      // Criar fontes com nomes e URLs correspondentes
      const sources = sourceNames.map((name, idx) => ({
        name,
        url: idx < urlList.length ? urlList[idx] : ''
      }));
      
      // Aqui implementaremos a lógica para adicionar o novo tópico
      console.log("Novo tópico:", { 
        nome: topicName, 
        icone: icon || "category", 
        fontes: sources,
        isDefault: false // Tópicos criados pelo usuário nunca são padrão
      });
      
      // Exibir toast de sucesso
      toast.success(`Tópico "${topicName}" criado com sucesso!`);
      
      // Fechar o diálogo após enviar
      setOpen(false);
      
      // Limpar os campos
      setTopicName("");
      setIcon("");
      setSourcesText("");
      setSourcesUrls("");
      
      setIsSubmitting(false);
    }, 800);
  };

  const ICONS_EXAMPLES = [
    "smartphone", "apps", "kitchen", "directions_car", "shopping_bag", 
    "sports_esports", "restaurant", "favorite", "flight", "movie",
    "home", "work", "school", "shopping_cart", "chat", "article"
  ];

  // Exemplo de ícone para exibição
  const displayIcon = icon || "category";

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      // Não permitir fechar durante submissão
      if (isSubmitting) return;
      setOpen(newOpen);
      // Fechar o seletor de ícone se o diálogo for fechado
      if (!newOpen) setShowIconPicker(false);
    }}>
      <DialogTrigger asChild>
        <Button className="w-full bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Criar Tópico
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="mb-3">
          <DialogTitle className="flex items-center text-lg font-medium">
            <span className="material-symbols-outlined mr-2">add_box</span>
            Criar Novo Tópico
          </DialogTitle>
          <DialogDescription>
            Adicione um novo tópico para categorizar suas pesquisas.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-1/4">
              <Label htmlFor="topicName">
                Nome
              </Label>
            </div>
            <div className="w-3/4">
              <Input
                id="topicName"
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
                placeholder="Ex: Notebook"
                autoFocus
                required
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-1/4">
              <Label htmlFor="icon">
                Ícone
              </Label>
            </div>
            <div className="w-3/4 flex space-x-2 items-center">
              <div className="relative w-full">
                <Input
                  id="icon"
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  placeholder="Ex: smartphone"
                  className="flex-1 pr-10"
                  onClick={() => setShowIconPicker(!showIconPicker)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="material-symbols-outlined text-blue-600">{displayIcon}</span>
                </div>
                
                {showIconPicker && (
                  <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
                    <div className="p-2 grid grid-cols-6 gap-2 max-h-40 overflow-y-auto">
                      {ICONS_EXAMPLES.map((iconName, index) => (
                        <div 
                          key={index}
                          className={`flex items-center justify-center h-8 w-8 rounded-md cursor-pointer hover:bg-blue-50 ${iconName === icon ? 'bg-blue-100 border border-blue-300' : ''}`}
                          onClick={() => {
                            setIcon(iconName);
                            setShowIconPicker(false);
                          }}
                        >
                          <span className="material-symbols-outlined">{iconName}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <div className="w-1/4 mt-2">
              <Label htmlFor="sources">
                Fontes
              </Label>
            </div>
            <div className="w-3/4">
              <div className="border border-blue-200 rounded-md p-3 bg-blue-50 relative space-y-3">
                <div>
                  <p className="text-sm text-blue-700 mb-1">Nomes das fontes</p>
                  <Input
                    id="sourceNames"
                    value={sourcesText}
                    onChange={(e) => setSourcesText(e.target.value)}
                    placeholder="Ex: Amazon, Magazine Luiza"
                    className="bg-white"
                  />
                </div>
                <div>
                  <p className="text-sm text-blue-700 mb-1">URLs das fontes</p>
                  <Input
                    id="sourceUrls"
                    value={sourcesUrls}
                    onChange={(e) => setSourcesUrls(e.target.value)}
                    placeholder="Ex: https://amazon.com.br, https://magazineluiza.com.br"
                    className="bg-white"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separe as URLs na mesma ordem dos nomes acima</p>
                </div>
                <div className="absolute bottom-3 right-3 text-blue-700">
                  <span className="material-symbols-outlined text-xl cursor-pointer hover:opacity-80">help</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-xs text-blue-600 hover:underline cursor-pointer px-1">
            <a href="https://fonts.google.com/icons" target="_blank" rel="noopener noreferrer" className="flex items-center">
              <span className="material-symbols-outlined text-sm mr-1">open_in_new</span>
              Ver biblioteca de ícones
            </a>
          </div>
        </div>
        
        <DialogFooter className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700">
            {isSubmitting ? "Criando..." : "Confirmar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const TopicManagementDialog = () => {
  const [open, setOpen] = useState(false);
  const [topics, setTopics] = useState<Topic[]>(EXAMPLE_TOPICS);
  const [editingSource, setEditingSource] = useState<{
    topicId: string, 
    index: number | null, 
    name: string,
    url: string
  }>({
    topicId: "",
    index: null,
    name: "",
    url: ""
  });
  const [newSource, setNewSource] = useState<{
    topicId: string, 
    name: string,
    url: string
  }>({
    topicId: "",
    name: "",
    url: ""
  });

  // Manter a separação apenas para organização visual, mas permitir edição em ambos
  const userTopics = topics.filter(topic => !topic.isDefault);
  const defaultTopics = topics.filter(topic => topic.isDefault);

  useEffect(() => {
    if (open) {
      const closeButton = document.querySelector('[data-radix-dialog-close]');
      if (closeButton && closeButton instanceof HTMLElement) {
        closeButton.style.top = '16px';
        closeButton.style.right = '16px';
      }
    }
  }, [open]);

  const handleDeleteSource = (topicId: string, sourceIndex: number) => {
    setTopics(topics.map(topic => {
      if (topic.id === topicId) {
        const updatedSources = [...topic.sources];
        updatedSources.splice(sourceIndex, 1);
        return { ...topic, sources: updatedSources };
      }
      return topic;
    }));
    
    toast.success("Fonte removida com sucesso.");
  };

  const handleEditSource = (topicId: string, sourceIndex: number, source: Source) => {
    setEditingSource({ 
      topicId, 
      index: sourceIndex, 
      name: source.name,
      url: source.url 
    });
  };

  const saveEditedSource = (topicId: string) => {
    if (!editingSource.name.trim()) {
      toast.error("O nome da fonte não pode estar vazio.");
      return;
    }

    if (!editingSource.url.trim()) {
      toast.error("A URL da fonte não pode estar vazia.");
      return;
    }

    setTopics(topics.map(topic => {
      if (topic.id === topicId && editingSource.index !== null) {
        const updatedSources = [...topic.sources];
        updatedSources[editingSource.index] = {
          name: editingSource.name,
          url: editingSource.url
        };
        return { ...topic, sources: updatedSources };
      }
      return topic;
    }));
    
    setEditingSource({ topicId: "", index: null, name: "", url: "" });
    toast.success("Fonte atualizada com sucesso.");
  };

  const handleAddNewSource = (topicId: string) => {
    setNewSource({ topicId, name: "", url: "" });
  };

  const saveNewSource = (topicId: string) => {
    if (!newSource.name.trim()) {
      toast.error("O nome da fonte não pode estar vazio.");
      return;
    }

    if (!newSource.url.trim()) {
      toast.error("A URL da fonte não pode estar vazia.");
      return;
    }

    setTopics(topics.map(topic => {
      if (topic.id === topicId) {
        return { 
          ...topic, 
          sources: [...topic.sources, { name: newSource.name, url: newSource.url }] 
        };
      }
      return topic;
    }));
    
    setNewSource({ topicId: "", name: "", url: "" });
    toast.success("Nova fonte adicionada com sucesso.");
  };

  const handleDeleteTopic = (topicId: string) => {    
    setTopics(topics.filter(topic => topic.id !== topicId));
    toast.success("Tópico removido com sucesso.");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 mt-2">
          <List className="mr-2 h-4 w-4" />
          Gerenciar Tópicos
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader className="mb-4">
          <DialogTitle className="flex items-center text-lg font-medium">
            <span className="material-symbols-outlined mr-2">folder_managed</span>
            Gerenciar Tópicos
          </DialogTitle>
          <DialogDescription>
            Visualize e gerencie os tópicos e fontes cadastrados.
          </DialogDescription>
        </DialogHeader>
        
        {/* Seção para tópicos do usuário */}
        {userTopics.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <h3 className="text-md font-medium">Meus Tópicos Personalizados</h3>
              <Badge className="ml-2 bg-green-100 text-green-700">{userTopics.length}</Badge>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {userTopics.map((topic) => (
                <AccordionItem value={topic.id} key={topic.id} className="border border-gray-200 rounded-md mb-3">
                  <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 [&[data-state=open]]:bg-blue-50">
                    <div className="flex items-center space-x-2">
                      <span className="material-symbols-outlined text-blue-600">
                        {topic.icon}
                      </span>
                      <span>{topic.name}</span>
                      <Badge className="ml-2 bg-blue-100 text-blue-600 hover:bg-blue-200">
                        {topic.sources.length} fontes
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-2">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-sm">Fontes cadastradas:</h4>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-7 text-xs"
                            onClick={() => handleAddNewSource(topic.id)}
                          >
                            <Plus className="mr-1 h-3 w-3" />
                            Adicionar Fonte
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            className="h-7 text-xs"
                            onClick={() => handleDeleteTopic(topic.id)}
                          >
                            <Trash2 className="mr-1 h-3 w-3" />
                            Excluir Tópico
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        {topic.sources.map((source, index) => (
                          <div 
                            key={`${topic.id}-${index}`} 
                            className="flex items-center justify-between border border-gray-100 rounded-md p-2 bg-gray-50"
                          >
                            {editingSource.topicId === topic.id && editingSource.index === index ? (
                              <div className="flex flex-col w-full space-y-2">
                                <div className="flex items-center w-full">
                                  <Label className="w-1/6 text-xs">Nome:</Label>
                                  <Input
                                    value={editingSource.name}
                                    onChange={(e) => setEditingSource({
                                      ...editingSource,
                                      name: e.target.value
                                    })}
                                    className="flex-grow mr-2 h-8 text-sm"
                                  />
                                </div>
                                <div className="flex items-center w-full">
                                  <Label className="w-1/6 text-xs">URL:</Label>
                                  <Input
                                    value={editingSource.url}
                                    onChange={(e) => setEditingSource({
                                      ...editingSource,
                                      url: e.target.value
                                    })}
                                    className="flex-grow mr-2 h-8 text-sm"
                                    placeholder="https://..."
                                  />
                                </div>
                                <div className="flex justify-end">
                                  <Button 
                                    size="sm" 
                                    className="h-8 bg-green-600 hover:bg-green-700"
                                    onClick={() => saveEditedSource(topic.id)}
                                  >
                                    Salvar
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <div className="flex flex-col">
                                  <span className="text-sm font-medium">{source.name}</span>
                                  <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 flex items-center">
                                    <LinkIcon className="h-3 w-3 mr-1" />
                                    {source.url}
                                  </a>
                                </div>
                                <div className="flex space-x-1">
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-7 w-7 p-0" 
                                    onClick={() => handleEditSource(topic.id, index, source)}
                                  >
                                    <Pencil className="h-3.5 w-3.5 text-blue-600" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-7 w-7 p-0" 
                                    onClick={() => handleDeleteSource(topic.id, index)}
                                  >
                                    <Trash2 className="h-3.5 w-3.5 text-red-600" />
                                  </Button>
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                        
                        {newSource.topicId === topic.id && (
                          <div className="flex flex-col space-y-2 border border-blue-200 rounded-md p-3 bg-blue-50">
                            <div className="flex items-center w-full">
                              <Label className="w-1/6 text-xs">Nome:</Label>
                              <Input
                                value={newSource.name}
                                onChange={(e) => setNewSource({
                                  ...newSource,
                                  name: e.target.value
                                })}
                                placeholder="Ex: Amazon"
                                className="flex-grow h-8 text-sm"
                                autoFocus
                              />
                            </div>
                            <div className="flex items-center w-full">
                              <Label className="w-1/6 text-xs">URL:</Label>
                              <Input
                                value={newSource.url}
                                onChange={(e) => setNewSource({
                                  ...newSource,
                                  url: e.target.value
                                })}
                                placeholder="https://amazon.com.br"
                                className="flex-grow h-8 text-sm"
                              />
                            </div>
                            <div className="flex justify-end">
                              <Button 
                                size="sm" 
                                className="h-8 bg-green-600 hover:bg-green-700"
                                onClick={() => saveNewSource(topic.id)}
                              >
                                Adicionar
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}
        
        {/* Seção para tópicos padrão do sistema (agora editáveis) */}
        <div>
          <div className="flex items-center mb-2">
            <h3 className="text-md font-medium">Tópicos do Sistema</h3>
            <Badge className="ml-2 bg-blue-100 text-blue-700">{defaultTopics.length}</Badge>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="ml-2 cursor-help">
                    <span className="material-symbols-outlined text-blue-500 text-sm">info</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-sm">Tópicos padrão do sistema. Suas edições serão salvas localmente.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            {defaultTopics.map((topic) => (
              <AccordionItem value={topic.id} key={topic.id} className="border border-gray-200 rounded-md mb-3">
                <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 [&[data-state=open]]:bg-blue-50">
                  <div className="flex items-center space-x-2">
                    <span className="material-symbols-outlined text-blue-600">
                      {topic.icon}
                    </span>
                    <span>{topic.name}</span>
                    <Badge className="ml-2 bg-blue-100 text-blue-600">
                      {topic.sources.length} fontes
                    </Badge>
                    <Badge className="ml-2 bg-gray-100 text-gray-600 text-xs">padrão</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 py-2">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-sm">Fontes cadastradas:</h4>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-7 text-xs"
                          onClick={() => handleAddNewSource(topic.id)}
                        >
                          <Plus className="mr-1 h-3 w-3" />
                          Adicionar Fonte
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          className="h-7 text-xs"
                          onClick={() => handleDeleteTopic(topic.id)}
                        >
                          <Trash2 className="mr-1 h-3 w-3" />
                          Excluir Tópico
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {topic.sources.map((source, index) => (
                        <div 
                          key={`${topic.id}-${index}`} 
                          className="flex items-center justify-between border border-gray-100 rounded-md p-2 bg-gray-50"
                        >
                          {editingSource.topicId === topic.id && editingSource.index === index ? (
                            <div className="flex flex-col w-full space-y-2">
                              <div className="flex items-center w-full">
                                <Label className="w-1/6 text-xs">Nome:</Label>
                                <Input
                                  value={editingSource.name}
                                  onChange={(e) => setEditingSource({
                                    ...editingSource,
                                    name: e.target.value
                                  })}
                                  className="flex-grow mr-2 h-8 text-sm"
                                />
                              </div>
                              <div className="flex items-center w-full">
                                <Label className="w-1/6 text-xs">URL:</Label>
                                <Input
                                  value={editingSource.url}
                                  onChange={(e) => setEditingSource({
                                    ...editingSource,
                                    url: e.target.value
                                  })}
                                  className="flex-grow mr-2 h-8 text-sm"
                                  placeholder="https://..."
                                />
                              </div>
                              <div className="flex justify-end">
                                <Button 
                                  size="sm" 
                                  className="h-8 bg-green-600 hover:bg-green-700"
                                  onClick={() => saveEditedSource(topic.id)}
                                >
                                  Salvar
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="flex flex-col">
                                <span className="text-sm font-medium">{source.name}</span>
                                <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 flex items-center">
                                  <LinkIcon className="h-3 w-3 mr-1" />
                                  {source.url}
                                </a>
                              </div>
                              <div className="flex space-x-1">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-7 w-7 p-0" 
                                  onClick={() => handleEditSource(topic.id, index, source)}
                                >
                                  <Pencil className="h-3.5 w-3.5 text-blue-600" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-7 w-7 p-0" 
                                  onClick={() => handleDeleteSource(topic.id, index)}
                                >
                                  <Trash2 className="h-3.5 w-3.5 text-red-600" />
                                </Button>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                      
                      {newSource.topicId === topic.id && (
                        <div className="flex flex-col space-y-2 border border-blue-200 rounded-md p-3 bg-blue-50">
                          <div className="flex items-center w-full">
                            <Label className="w-1/6 text-xs">Nome:</Label>
                            <Input
                              value={newSource.name}
                              onChange={(e) => setNewSource({
                                ...newSource,
                                name: e.target.value
                              })}
                              placeholder="Ex: Amazon"
                              className="flex-grow h-8 text-sm"
                              autoFocus
                            />
                          </div>
                          <div className="flex items-center w-full">
                            <Label className="w-1/6 text-xs">URL:</Label>
                            <Input
                              value={newSource.url}
                              onChange={(e) => setNewSource({
                                ...newSource,
                                url: e.target.value
                              })}
                              placeholder="https://amazon.com.br"
                              className="flex-grow h-8 text-sm"
                            />
                          </div>
                          <div className="flex justify-end">
                            <Button 
                              size="sm" 
                              className="h-8 bg-green-600 hover:bg-green-700"
                              onClick={() => saveNewSource(topic.id)}
                            >
                              Adicionar
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const SettingsPanel = ({ className }: SettingsPanelProps) => {
  return (
    <Card className={`shadow-md ${className} bg-white border-gray-200`}>
      <CardHeader className="pb-2 border-b border-gray-100">
        <CardTitle className="text-lg flex items-center">
          <Settings className="mr-2 h-5 w-5 text-blue-600" />
          Configurações
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-gray-500 text-sm mb-4">
          Configure suas preferências de busca e visualização.
        </p>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Gerenciar Tópicos</h3>
            <TopicCreationDialog />
            <TopicManagementDialog />
          </div>
          
          <div className="text-center py-4 text-gray-400">
            <span className="material-symbols-outlined text-4xl mb-2">settings</span>
            <p>Mais configurações serão adicionadas em breve.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingsPanel; 