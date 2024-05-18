namespace Dofins.Interfaces
{
    public interface IAuthentication
    {
        Task<String> GetTokenFireAnt();
    }
}
