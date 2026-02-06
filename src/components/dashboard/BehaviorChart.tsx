import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface BehaviorChartProps {
  data: Array<{
    time: string;
    score: number;
    requests: number;
  }>;
}

export const BehaviorChart = ({ data }: BehaviorChartProps) => {
  return (
    <div className="glass-card rounded-2xl p-6 border-border/50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display font-semibold text-lg text-foreground">Behavioral Analysis</h3>
          <p className="text-sm text-muted-foreground">Real-time risk score trends</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-muted-foreground">Risk Score</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyber-purple" />
            <span className="text-muted-foreground">Requests</span>
          </div>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(180, 65%, 45%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(180, 65%, 45%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="requestGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(260, 60%, 60%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(260, 60%, 60%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 88%)" opacity={0.5} />
            <XAxis 
              dataKey="time" 
              tick={{ fontSize: 11, fill: "hsl(220, 10%, 45%)" }} 
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              tick={{ fontSize: 11, fill: "hsl(220, 10%, 45%)" }} 
              tickLine={false}
              axisLine={false}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(0, 0%, 100%)",
                border: "1px solid hsl(220, 15%, 88%)",
                borderRadius: "12px",
                boxShadow: "0 4px 12px hsl(220, 20%, 20%, 0.08)"
              }}
            />
            <Area
              type="monotone"
              dataKey="score"
              stroke="hsl(180, 65%, 45%)"
              strokeWidth={2}
              fill="url(#scoreGradient)"
            />
            <Area
              type="monotone"
              dataKey="requests"
              stroke="hsl(260, 60%, 60%)"
              strokeWidth={2}
              fill="url(#requestGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BehaviorChart;
