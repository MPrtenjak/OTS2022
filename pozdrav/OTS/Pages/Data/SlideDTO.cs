namespace pozdrav.OTS.Pages.Data
{
	public class SlideDTO
	{
		public Type SlideComponent { get; init; }
		public string Caption { get; init; }

		public SlideDTO(string slideComponentName, string caption)
		{
			SlideComponent = getSlideComponentType(slideComponentName);
			Caption = caption;
		}

		private static Type getSlideComponentType(string slideComponentName)
		{
			var fullTypeName = "pozdrav.OTS.Pages.SlideTemplates." + slideComponentName;
			return Type.GetType(fullTypeName)!;
		}
	}
}
