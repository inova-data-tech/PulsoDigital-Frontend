import { useState, useEffect } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { TOPICS } from "@/lib/topics";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";

interface TopicSelectorProps {
  value: string;
  onChange: (topicId: string) => void;
  className?: string;
}

const TopicSelector = ({ value, onChange, className }: TopicSelectorProps) => {
  const [selectedTopic, setSelectedTopic] = useState(value || TOPICS[0].id);
  
  // Quando o valor muda externamente, atualizar o estado interno
  useEffect(() => {
    if (value && value !== selectedTopic) {
      setSelectedTopic(value);
    }
  }, [value]);
  
  const handleChange = (newValue: string) => {
    setSelectedTopic(newValue);
    onChange(newValue);
  };

  // Encontrar o tópico selecionado para exibir informações adicionais
  const currentTopic = TOPICS.find(topic => topic.id === selectedTopic);

  return (
    <div className={`mb-4 ${className}`}>
      <div className="flex items-center mb-2">
        <label className="text-sm font-medium text-gray-700 mr-2">Tópico</label>
        {currentTopic && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 text-gray-400 cursor-help" />
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-sm">
                <div>
                  <p className="font-medium">{currentTopic.name}</p>
                  <p className="text-sm my-1">{currentTopic.description}</p>
                  <div className="text-xs text-gray-400 mt-1">
                    <p>Fontes: {currentTopic.sources.join(", ")}</p>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      
      <Select value={selectedTopic} onValueChange={handleChange}>
        <SelectTrigger className="w-full border-gray-300 focus:border-blue-500 rounded-xl">
          <SelectValue placeholder="Selecione um tópico" />
        </SelectTrigger>
        <SelectContent>
          {TOPICS.map((topic) => (
            <SelectItem 
              key={topic.id} 
              value={topic.id}
              className="flex items-center"
            >
              <div className="flex items-center">
                <span className="material-symbols-outlined mr-2 text-gray-500">{topic.icon}</span>
                {topic.name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TopicSelector; 