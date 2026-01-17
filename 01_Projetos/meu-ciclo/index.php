<?php
// --- Configurações Iniciais e Tratamento de Dados ---

// Definir fuso horário para cálculos de data/hora
date_default_timezone_set('America/Sao_Paulo');

// Capturar inputs do utilizador (ou definir padrões)
// Aplicar htmlspecialchars e (int) imediatamente para segurança (XSS e Type Injection)
$data_ultima_menstruacao = isset($_GET['data_menstruacao']) ? htmlspecialchars($_GET['data_menstruacao']) : '2025-11-14';
$duracao_ciclo = isset($_GET['ciclo']) ? (int)$_GET['ciclo'] : 30;
$duracao_sangramento = isset($_GET['sangramento']) ? (int)$_GET['sangramento'] : 5;

// --- CORREÇÃO: Lógica de Visualização do Calendário (Prioriza Navegação) ---

// 1. Prioridade máxima: Se houver 'mes' e 'ano' no URL (indica navegação entre meses), usamos esses valores.
if (isset($_GET['mes']) && isset($_GET['ano'])) {
    $mes_visualizacao = (int)$_GET['mes'];
    $ano_visualizacao = (int)$_GET['ano'];
} 
// 2. Segunda Prioridade: Se a data de menstruação foi submetida, usamos o mês dessa data para o reset da visualização.
elseif (isset($_GET['data_menstruacao'])) {
    try {
        $data_obj = new DateTime($data_ultima_menstruacao);
        $mes_visualizacao = (int)$data_obj->format('m');
        $ano_visualizacao = (int)$data_obj->format('Y');
    } catch (Exception $e) {
        // Fallback seguro em caso de data inválida
        $mes_visualizacao = (int)date('m');
        $ano_visualizacao = (int)date('Y');
    }
}
// 3. Fallback: Usar o padrão inicial.
else {
    $mes_visualizacao = 11; 
    $ano_visualizacao = 2025;
}
// --------------------------------------------------------------------------

// Lógica para navegação entre meses (ajuste de ano)
if ($mes_visualizacao > 12) {
    $mes_visualizacao = 1;
    $ano_visualizacao++;
} elseif ($mes_visualizacao < 1) {
    $mes_visualizacao = 12;
    $ano_visualizacao--;
}

// --- Lógica de Negócio (Cálculos do Ciclo) ---

// Constante biológica (fase lútea média)
$fase_lutea = 14;

// Função para calcular status do dia
function getStatusDia($data_atual_str, $data_inicio_str, $duracao_ciclo, $duracao_sangramento, $fase_lutea) {
    if (empty($data_inicio_str)) return null; 

    try {
        $data_atual = new DateTime($data_atual_str);
        $data_inicio = new DateTime($data_inicio_str . ' 12:00:00'); 
    } catch (Exception $e) {
        return null; 
    }

    // Calculamos a diferença em dias
    $intervalo = $data_inicio->diff($data_atual);
    $diff_days = (int)$intervalo->format('%r%a');

    if ($diff_days < 0) return null;

    $dia_do_ciclo = ($diff_days % $duracao_ciclo) + 1;

    // Marcos do ciclo
    $dia_ovulacao = $duracao_ciclo - $fase_lutea;
    $inicio_fertil = $dia_ovulacao - 5;
    $fim_fertil = $dia_ovulacao;

    $status = ['tipo' => 'normal', 'bg' => 'bg-white hover:bg-gray-50', 'label' => '', 'dia_ciclo' => $dia_do_ciclo];

    if ($dia_do_ciclo >= 1 && $dia_do_ciclo <= $duracao_sangramento) {
        $status['tipo'] = 'menstruacao';
        $status['bg'] = 'bg-rose-500 text-white shadow-md';
        $status['label'] = 'Menstruação';
    } elseif ($dia_do_ciclo === $dia_ovulacao) {
        $status['tipo'] = 'ovulacao';
        $status['bg'] = 'bg-purple-500 text-white font-bold ring-2 ring-purple-200 z-10';
        $status['label'] = 'Ovulação';
    } elseif ($dia_do_ciclo >= $inicio_fertil && $dia_do_ciclo < $fim_fertil) {
        $status['tipo'] = 'fertil';
        $status['bg'] = 'bg-emerald-400 text-white';
        $status['label'] = 'Fértil';
    }

    return $status;
}

// Previsão para os cards de resumo
try {
    $data_base = new DateTime($data_ultima_menstruacao);
} catch (Exception $e) {
    $data_base = new DateTime('now');
}

$dia_ovulacao_ciclo = $duracao_ciclo - $fase_lutea;

// Clonar objetos para não alterar a data base
$proxima_menstruacao = (clone $data_base)->modify("+$duracao_ciclo days");
$proxima_ovulacao = (clone $data_base)->modify("+" . ($dia_ovulacao_ciclo - 1) . " days");
$inicio_fertil = (clone $data_base)->modify("+" . ($dia_ovulacao_ciclo - 6) . " days");

// --- Lógica do Calendário e Links ---
$primeiro_dia_mes = mktime(0, 0, 0, $mes_visualizacao, 1, $ano_visualizacao);
$numero_dias_mes = date('t', $primeiro_dia_mes);
$dia_semana_inicio = date('w', $primeiro_dia_mes);
$nome_meses = [
    1 => 'Janeiro', 2 => 'Fevereiro', 3 => 'Março', 4 => 'Abril', 5 => 'Maio', 6 => 'Junho',
    7 => 'Julho', 8 => 'Agosto', 9 => 'Setembro', 10 => 'Outubro', 11 => 'Novembro', 12 => 'Dezembro'
];
$nome_mes_atual = $nome_meses[$mes_visualizacao];

// Criação da query base para links (com URL Encoding para segurança)
$query_base = "data_menstruacao=" . urlencode($data_ultima_menstruacao) . "&ciclo=$duracao_ciclo&sangramento=$duracao_sangramento";
$link_anterior = "?$query_base&mes=" . ($mes_visualizacao - 1) . "&ano=$ano_visualizacao";
$link_proximo = "?$query_base&mes=" . ($mes_visualizacao + 1) . "&ano=$ano_visualizacao";

?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculadora de Ciclo Menstrual</title>
    
    <!-- Script opcional para esconder o aviso de produção do Tailwind na consola -->
    <script>
        const originalWarn = console.warn;
        console.warn = (...args) => {
            if (args[0] && typeof args[0] === 'string' && args[0].includes('cdn.tailwindcss.com')) return;
            originalWarn.apply(console, args);
        };
    </script>

    <!-- Tailwind CSS via CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        /* Ajustes finos para inputs range */
        input[type=range] { accent-color: #f43f5e; }
    </style>
</head>
<body class="min-h-screen bg-rose-50 font-sans text-gray-800 flex flex-col items-center p-4">

    <!-- ANÚNCIO 1: TOPO -->
    <div class="w-full max-w-4xl mb-6">
        <div class="flex flex-col items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg mx-auto overflow-hidden h-24 w-full max-w-[728px]">
            <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">Publicidade</span>
            <span class="text-[10px] text-gray-400">(Google AdSense)</span>
        </div>
    </div>

    <div class="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden">
        
        <!-- Cabeçalho -->
        <div class="bg-gradient-to-r from-rose-400 to-pink-500 p-6 text-white">
            <div class="flex items-center justify-between">
                <h1 class="text-2xl font-bold flex items-center gap-2">
                    <!-- Icon Calendar SVG -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    Meu Ciclo
                </h1>
                <!--<div class="text-sm opacity-90 bg-white/20 px-3 py-1 rounded-full">-->
                <!--    PHP Versão Segura-->
                <!--</div>-->
            </div>
            <p class="mt-2 opacity-90">Acompanhamento e previsão do ciclo menstrual</p>
        </div>

        <div class="grid md:grid-cols-3 gap-6 p-6">
            
            <!-- COLUNA ESQUERDA: Formulário e Configurações -->
            <div class="md:col-span-1 space-y-6">
                
                <!-- Formulário (USA GET) -->
                <form action="" method="GET" class="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <!-- Campos escondidos REMOVIDOS para evitar conflito com a navegação do calendário.
                         A lógica de visualização é agora tratada apenas pelos parâmetros 'mes'/'ano' nos links de navegação. -->
                    
                    <h2 class="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                        <!-- Icon Info -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                        Configurações
                    </h2>
                    
                    <div class="space-y-4">
                        <div>
                            <label class="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                                Última Menstruação
                            </label>
                            <input 
                                type="date" 
                                name="data_menstruacao"
                                value="<?php echo $data_ultima_menstruacao; ?>" 
                                class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 outline-none"
                                required
                            >
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                                Duração do Ciclo (dias)
                            </label>
                            <div class="flex items-center gap-3">
                                <input 
                                    type="range" 
                                    name="ciclo"
                                    min="21" 
                                    max="40" 
                                    value="<?php echo $duracao_ciclo; ?>"
                                    oninput="document.getElementById('val_ciclo').innerText = this.value"
                                    class="flex-1"
                                >
                                <span id="val_ciclo" class="font-bold text-rose-600 w-8 text-center"><?php echo $duracao_ciclo; ?></span>
                            </div>
                            <p class="text-xs text-gray-400 mt-1">Média comum: 28-30 dias</p>
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                                Duração da Menstruação
                            </label>
                            <div class="flex items-center gap-3">
                                <input 
                                    type="range" 
                                    name="sangramento"
                                    min="3" 
                                    max="8" 
                                    value="<?php echo $duracao_sangramento; ?>"
                                    oninput="document.getElementById('val_sang').innerText = this.value"
                                    class="flex-1"
                                >
                                <span id="val_sang" class="font-bold text-rose-600 w-8 text-center"><?php echo $duracao_sangramento; ?></span>
                            </div>
                        </div>

                        <button type="submit" class="w-full bg-rose-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-rose-600 transition-colors shadow-md">
                            Atualizar Cálculo
                        </button>
                    </form>
                </div>

                <!-- Resumo Rápido -->
                <div class="bg-rose-50 p-4 rounded-xl border border-rose-100 space-y-3">
                    <h3 class="font-semibold text-rose-800">Próximos Marcos</h3>
                    <div class="flex items-center justify-between text-sm">
                        <span class="text-gray-600">Período Fértil:</span>
                        <span class="font-bold text-emerald-600"><?php echo $inicio_fertil->format('d/m/Y'); ?></span>
                    </div>
                    <div class="flex items-center justify-between text-sm">
                        <span class="text-gray-600">Ovulação:</span>
                        <span class="font-bold text-purple-600"><?php echo $proxima_ovulacao->format('d/m/Y'); ?></span>
                    </div>
                    <div class="flex items-center justify-between text-sm">
                        <span class="text-gray-600">Menstruação:</span>
                        <span class="font-bold text-rose-600"><?php echo $proxima_menstruacao->format('d/m/Y'); ?></span>
                    </div>
                </div>

                <!-- Legenda -->
                <div class="space-y-2 text-xs text-gray-500">
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-rose-500"></div> Menstruação
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-emerald-400"></div> Período Fértil
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-purple-500"></div> Dia da Ovulação
                    </div>
                </div>

                <!-- ANÚNCIO 2: SIDEBAR -->
                <div class="pt-4">
                    <div class="flex flex-col items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg mx-auto overflow-hidden h-[250px] w-full max-w-[300px]">
                        <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">Publicidade</span>
                        <span class="text-[10px] text-gray-400">(Google AdSense)</span>
                    </div>
                </div>

            </div>

            <!-- COLUNA DIREITA: Calendário -->
            <div class="md:col-span-2 flex flex-col h-full">
                <div class="bg-white rounded-xl flex-1">
                    
                    <!-- Header do Calendário -->
                    <div class="flex items-center justify-between mb-4">
                        <a href="<?php echo $link_anterior; ?>" class="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
                            <!-- ChevronLeft -->
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                        </a>
                        <h2 class="text-xl font-bold text-gray-800 capitalize">
                            <?php echo "$nome_mes_atual $ano_visualizacao"; ?>
                        </h2>
                        <a href="<?php echo $link_proximo; ?>" class="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
                            <!-- ChevronRight -->
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </a>
                    </div>

                    <!-- Grid do Calendário -->
                    <div class="grid grid-cols-7 mb-2 text-center">
                        <?php 
                        $dias_semana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
                        foreach ($dias_semana as $dia) {
                            echo "<div class='text-xs font-bold text-gray-400 uppercase py-2'>$dia</div>";
                        }
                        ?>
                    </div>
                    
                    <div class="grid grid-cols-7 gap-1 sm:gap-2">
                        <?php
                        // Dias vazios no início
                        for ($i = 0; $i < $dia_semana_inicio; $i++) {
                            echo '<div class="h-14 sm:h-24 bg-gray-50 border border-gray-100"></div>';
                        }

                        // Dias do mês
                        for ($dia = 1; $dia <= $numero_dias_mes; $dia++) {
                            $data_atual_loop = sprintf('%04d-%02d-%02d', $ano_visualizacao, $mes_visualizacao, $dia);
                            $status = getStatusDia($data_atual_loop, $data_ultima_menstruacao, $duracao_ciclo, $duracao_sangramento, $fase_lutea);
                            
                            $bg_class = $status ? $status['bg'] : 'bg-white hover:bg-gray-50';
                            $label = $status ? $status['label'] : '';
                            $tipo = $status ? $status['tipo'] : 'normal';

                            // Ícones condicionais (SVG)
                            $icon_html = '';
                            if ($tipo === 'menstruacao') {
                                // Droplets Icon
                                $icon_html = '<svg class="opacity-80" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>';
                            } elseif ($tipo === 'fertil') {
                                // Heart Icon
                                $icon_html = '<svg class="opacity-80" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>';
                            } elseif ($tipo === 'ovulacao') {
                                // Baby/Star Icon (simulado)
                                $icon_html = '<svg class="animate-pulse" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>';
                            }

                            echo "
                            <div class='h-14 sm:h-24 border border-gray-100 flex flex-col justify-between p-1 sm:p-2 transition-colors relative overflow-hidden $bg_class'>
                                <span class='text-xs sm:text-sm font-medium'>$dia</span>
                                <div class='flex justify-center items-center h-full'>
                                    $icon_html
                                </div>
                                <span class='hidden sm:block text-[10px] text-center w-full opacity-90 font-medium'>
                                    $label
                                </span>
                            </div>";
                        }
                        ?>
                    </div>
                </div>
                
                <!-- ANÚNCIO 3: ABAIXO DO CALENDÁRIO -->
                <div class="mt-6">
                   <div class="flex flex-col items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg mx-auto overflow-hidden h-24 w-full">
                        <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">Publicidade</span>
                        <span class="text-[10px] text-gray-400">(Google AdSense)</span>
                   </div>
                </div>
            </div>

        </div>
    </div>
    
    <p class="mt-8 text-gray-400 text-sm text-center">
        Nota: As datas são estimativas baseadas em médias biológicas. Consulte um médico para orientações precisas.
    </p>

</body>
</html>