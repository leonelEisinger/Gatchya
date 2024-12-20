$(document).ready(function () {
    const cards = $('.raridade');
    const results = ["Common", "Rare", "Mythical", "Legendary"];
    const loadingSpinner = $('.loading');
    var animationDuration = 1000; // 1 segundo dura a animação
    loadingSpinner.hide();

    // Definir as probabilidades para cada raridade
    const probabilities = {
        "Common": 60,
        "Rare": 25,
        "Mythical": 10,
        "Legendary": 5
    };

    // Inicializando os contadores de raridade
    const rarityCounters = {
        "Common": 0,
        "Rare": 0,
        "Mythical": 0,
        "Legendary": 0,
        "Total": 0
    };

    

    // Definir as cores para cada raridade
    const rarityColors = {
        "Common": "#aaa", // Cor para 'Common' (cinza)
        "Rare": "#4287f5",   // Cor para 'Rare' (azul)
        "Mythical": "#8e44ad", // Cor para 'Mythical' (dourado)
        "Legendary": "#f1c40f" // Cor para 'Legendary' (laranja forte)
    };

    // Função para selecionar uma raridade com base nas probabilidades
    function getRarity() {
        const rand = Math.random() * 100; // Gera um número entre 0 e 100
        let cumulativeProbability = 0;

        for (let rarity in probabilities) {
            cumulativeProbability += probabilities[rarity];
            if (rand <= cumulativeProbability) {
                return rarity;
            }
        }
    }

    // Função para atualizar os contadores de raridade na tela
    function updateCounters() {
        // Atualiza os valores dos contadores na interface
        $('#commonCount').text(rarityCounters["Common"]);
        $('#rareCount').text(rarityCounters["Rare"]);
        $('#mythicalCount').text(rarityCounters["Mythical"]);
        $('#legendaryCount').text(rarityCounters["Legendary"]);
        $('#total').text(rarityCounters["Total"]);
    }

    // Função para adicionar o histórico com quadrados coloridos
    function updateHistory(rarity) {
    const historyList = $('#historicoLista'); // O container do histórico
    const maxHistoryItems = 138; // Defina o número máximo de quadrados no histórico

    // Verifica se o número de itens no histórico excede o limite
    if (historyList.children().length >= maxHistoryItems) {
        historyList.children().last().remove(); // Remove o quadrado mais antigo
    }

    // Cria um novo quadrado colorido
    const historyItem = $('<div>') 
        .css({
            width: '25px',   // Tamanho do quadrado
            height: '25px',  // Tamanho do quadrado
            backgroundColor: rarityColors[rarity], // Cor do quadrado
            borderRadius: '4px', // Tornar os quadrados ligeiramente arredondados
        });

    // Adiciona o quadrado ao container de histórico
    historyList.prepend(historyItem);
}

    // Função para rodar a roleta até aparecer uma "Legendary"
    function legendary($button) {
        // Função para rodar a roleta até encontrar uma "Legendary"
        function spinOnce() {
            let delay = 0; // Controle de atraso acumulativo para cada execução
        
            for (let i = 0; i < times; i++) {
                setTimeout(() => {
                    spin($button);
                }, delay);
        
            delay += animationDuration + 500; // Tempo suficiente para a animação + margem de segurança
            }
                // Se for uma "Legendary", finaliza o processo
                if (selectedRarity === "Legendary") {
                    loadingSpinner.hide();
                    // Garante que o botão seja reabilitado independentemente de qualquer erro
                    $button.prop('disabled', false);
                } else {
                    // Caso contrário, continua rodando
                    spinOnce();
                }
            }
    
    }

    // Função para rodar a roleta 10 vezes + 1 extra
    function ten($button, times) {
        let delay = 0; // Controle de atraso acumulativo para cada execução
        
        for (let i = 0; i < times; i++) {
            setTimeout(() => {
                spin($button);
            }, delay);
        
            delay += animationDuration + 500; // Tempo suficiente para a animação + margem de segurança
        }
    }

    function spin($button){
        // Exibe a animação de carregamento
        loadingSpinner.show();

        // Reseta as cartas
        cards.css({ opacity: 0, transform: 'scale(0.5)' });

        // Adiciona a animação de spin
        $('.carousel').addClass('spin-animation');

        // Usamos um tempo maior para garantir que a animação do spin seja visível

        setTimeout(function () {
            try {
                // Remove a animação de spin
                $('.carousel').removeClass('spin-animation');
                
                // Esconde a animação de carregamento
                loadingSpinner.hide(); 

                // Obtém a raridade com base nas probabilidades
                const selectedRarity = getRarity();
                
                // Encontra o índice correspondente à raridade selecionada
                const selectedIndex = results.indexOf(selectedRarity);

                const selectedCard = cards.eq(selectedIndex);

                selectedCard.css({ opacity: 1, transform: 'scale(1)' }); // Exibe a raridade selecionada

                // Incrementa o contador da raridade selecionada
                rarityCounters[selectedRarity]++;

                // Incrementa o contador total de aberturas
                rarityCounters['Total']++;

                // Atualiza os contadores na tela
                updateCounters();

                // Atualiza o histórico com o quadrado colorido
                updateHistory(selectedRarity);
            } catch (error) {
                console.error("Erro durante o processamento:", error);
            } finally {
                // Garante que o botão seja reabilitado independentemente de qualquer erro
                $button.prop('disabled', false);
            }
        }, animationDuration);
    }

    // Evento do botão para girar até aparecer uma Legendary
    $('#legendary').click(function () {
        var $button = $(this); // Seleciona o botão
        $button.prop('disabled', true); // desabilita o botão
        legendary($button);
    });

    // Evento do botão para girar 10+1 vezes
    $('#ten').click(function () {
        var $button = $(this); // Seleciona o botão
        $button.prop('disabled', true); // desabilita o botão
        ten($button, 10);
    });

    // Evento do botão para girar uma vez (original)
    $('#spin').click(function () {
        var $button = $(this); // Seleciona o botão
        $button.prop('disabled', true); // Desabilita o botão para evitar múltiplos cliques
        spin($button);
    });

    
});