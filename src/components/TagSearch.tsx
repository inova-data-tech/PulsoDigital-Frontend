import { useState } from "react";
import { TagSearchState, Topic } from "@/lib/types";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { addSearch } from "@/lib/search-service";
import TopicSelector from "./TopicSelector";
import { getDefaultTopic, getTopicById, TOPICS } from "@/lib/topics";
import { Button } from "@/components/ui/button";

const TagSearch = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<TagSearchState>({
    isLoading: false,
    tag: "",
    topic: getDefaultTopic().id
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, tag: e.target.value });
  };
  
  const handleTopicChange = (topicId: string) => {
    setState({ ...state, topic: topicId, tag: "" });
  };

  const handleSuggestionClick = (suggestion: string) => {
    setState({ ...state, tag: suggestion });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!state.tag.trim()) {
      toast.error("Por favor, informe uma tag para análise");
      return;
    }
    
    setState({ ...state, isLoading: true });
    
    const trimmedTag = state.tag.trim();
    addSearch(trimmedTag, state.topic);
    setState({ ...state, isLoading: false, tag: "" });
    toast.success(`Análise da tag "${trimmedTag}" foi iniciada!`);
    toast.info("A análise está em andamento. Você será notificado quando estiver pronta.");
  };

  const currentTopic = getTopicById(state.topic);
  const currentSuggestions = currentTopic?.suggestions || [];

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-end gap-4 mb-2">
        <div className="w-1/4">
          <TopicSelector 
            value={state.topic} 
            onChange={handleTopicChange}
          />
        </div>
        
        <div className="relative group flex-1">
          <span className="material-symbols-outlined absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 transition-all duration-300 group-focus-within:text-primary-500">
            tag
          </span>
          <input
            type="text"
            placeholder="Digite sua tag (ex: S23 Ultra, ChatGPT...)"
            className="w-full py-4 px-12 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 shadow-sm"
            value={state.tag}
            onChange={handleInputChange}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-100 text-gray-500 px-2 py-1 rounded-lg text-xs font-medium">
            ex: iPhone 15
          </div>
        </div>
      </div>

      {currentSuggestions.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2 items-center justify-center">
          <span className="text-sm text-gray-600 mr-2">Sugestões:</span>
          {currentSuggestions.map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="text-xs h-7 px-2 py-1 bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-300"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </Button>
          ))}
        </div>
      )}
      
      <button
        type="submit"
        disabled={state.isLoading}
        className="w-full primary-button flex items-center justify-center group mb-6"
      >
        <span className="text-lg mr-2">Analisar Agora</span>
        <span className="material-symbols-outlined transform group-hover:translate-x-1 transition-transform duration-300">
          trending_up
        </span>
        {state.isLoading && (
          <svg
            className="ml-3 h-5 w-5 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
      </button>
    </form>
  );
};

export default TagSearch;
